import { useAudioPlayer } from './useAudioPlayer.js';
import { useAudioControllerSingle } from './useAudioControllerSingle.js';

/**
 * 再生ボタンとプログレスバーと時間
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
var PROGRESS_INTERVAL = 50;
// デフォルト設定
var DEFAULT = {
  // オーディオソースを指定する属性
  attrSource: "data-audio-src",
  // 状態を格納する属性
  attrState: "data-audio-state",
  // ソースのタイプを指定する属性 {mp3 / hds / hls / mse}
  attrFormat: "data-audio-format",
  // プレイボタンのクラス名
  btnClassName: ".playbtn",
  // プログレスベースのクラス名
  baseClassName: ".progress-base",
  // プログレスバーのクラス名
  barClassName: ".progress-bar",
  // useAudioSource の設定
  sourceOption: {
    hds: {
      playlist: "/manifest.f4m"
    },
    hls: {
      playlist: "/playlist.m3u8"
    },
    mse: {
      playlist: "/manifest.mpd",
      autoplay: false
    }
  }
};
/**
 *
 */
var useAudioController = function useAudioController(option) {
  // 設定反映
  var $_opt = Object.assign(DEFAULT, option);
  // オーディオプレイヤー
  var audioPlayer = useAudioPlayer($_opt.sourceOption);
  var audio = audioPlayer.audioSource.audio;
  // コントローラー一覧
  var $_controllerList = [];
  // 現在再生中のコントローラーindex
  var $_nowPlayingIndex;
  // プログレスバー更新のインターバル
  var $_progressIntervalId;
  /**
   * 再生中にプログレスバーの状態を変更する
   */
  var $_startProgress = function $_startProgress() {
    var controller = $_controllerList[$_nowPlayingIndex];
    $_progressIntervalId = window.setInterval(function () {
      var total = audio.duration;
      var current = audio.currentTime;
      var per = current / total;
      controller.setProgress(per);
    }, PROGRESS_INTERVAL);
  };
  /**
   * プログレスバーの動きを止める
   */
  var $_stopProgress = function $_stopProgress() {
    clearInterval($_progressIntervalId);
  };
  /**
   * プレイボタンをクリック
   */
  var $_onClickPlayBtn = function $_onClickPlayBtn(index) {
    var targetController = $_controllerList[index];
    // 再生中か新規再生か
    if (index === $_nowPlayingIndex) {
      if (audioPlayer.isPlaying) {
        targetController.setState("pause");
      } else {
        targetController.setState("play");
      }
      audioPlayer.pause();
    } else {
      $_stop();
      audioPlayer.play(targetController.source, targetController.format);
      targetController.setState("play");
      $_nowPlayingIndex = index;
    }
  };
  /**
   * プログレスバーをクリック
   */
  var $_onClickProgressBar = function $_onClickProgressBar(index, per) {
    // 再生位置位置移動
    // console.log("click progress", audio.duration, per);
    if (index !== $_nowPlayingIndex) {
      $_stop();
    }
    if (audioPlayer.isPlaying) {
      audio.currentTime = audio.duration * per;
    } else {
      var targetController = $_controllerList[index];
      audioPlayer.play(targetController.source, targetController.format);
      targetController.setState("play");
      $_nowPlayingIndex = index;
    }
  };
  /**
   * 停止
   */
  var $_stop = function $_stop() {
    audioPlayer.stop();
    $_stopProgress();
    if ($_nowPlayingIndex !== undefined) {
      // ここでプログレスバーも 0 に戻る
      $_controllerList[$_nowPlayingIndex].setState("stop");
    }
    $_nowPlayingIndex = undefined;
  };
  /**
   * コントローラーを設定する
   * @param selector querySelectorAll() で使う
   */
  var setControllerWithSelector = function setControllerWithSelector(selector) {
    var elements = document.querySelectorAll(selector);
    var index = 0;
    elements.forEach(function (elm) {
      // オーディオコントローラー本体
      var controller = useAudioControllerSingle({
        elm: elm,
        index: index,
        option: $_opt
      });
      // イベントハンドラ設定
      controller.setHandlPlay($_onClickPlayBtn);
      controller.setHandlProgress($_onClickProgressBar);
      $_controllerList.push(controller);
      index += 1;
    });
    /////////////////////////////////
    // イベント
    // 再生終了
    audio.addEventListener("ended", $_stop);
    // 再生準備
    audio.addEventListener("loadeddata", function () {
      // プログレスバーの位置から始める
      var controller = $_controllerList[$_nowPlayingIndex || 0];
      var per = controller.progress;
      audio.currentTime = audio.duration * per;
      // console.log("loadeddata", audio.duration, per);
      $_startProgress();
    });
    // 再生開始
    audio.addEventListener("play", function () {
      $_startProgress();
    });
    // 一時停止
    audio.addEventListener("pause", function () {
      $_stopProgress();
    });
  };
  return {
    setControllerWithSelector: setControllerWithSelector,
    get nowPlayingControllerIndex() {
      return $_nowPlayingIndex;
    }
  };
};

export { useAudioController };
//# sourceMappingURL=useAudioController.js.map
