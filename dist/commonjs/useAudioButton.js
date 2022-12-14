'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useAudioPlayer = require('./useAudioPlayer.js');

/**
 * 一つのボタンで再生・一時停止・停止をするオーディオ再生ボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
// デフォルト設定
var DEFAULT = {
  // オーディオソースを指定する属性
  attrSource: "data-audio-src",
  // 状態を格納する属性
  attrState: "data-audio-state",
  // ソースのタイプを指定する属性 {file / hds / hls / mse}
  attrFormat: "data-audio-format",
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
var useAudioButton = function useAudioButton(option) {
  // 設定反映
  var $_opt = Object.assign(DEFAULT, option);
  // オーディオプレイヤー
  var audioPlayer = useAudioPlayer.useAudioPlayer($_opt.sourceOption);
  // 現在再生中のボタンエレメント
  var nowPlayingButton;
  // 対象エレメント一覧
  var $_targetElements;
  /**
   * エレメントの状態を変更する
   */
  var $_changeElementState = function $_changeElementState(elm, state) {
    elm.setAttribute($_opt.attrState, state);
  };
  /**
   * ボタンを設定する
   * @param selector querySelectorAll() で使う
   */
  var setButtonWithSelector = function setButtonWithSelector(selector) {
    $_targetElements = document.querySelectorAll(selector);
    $_targetElements.forEach(function (elm) {
      elm.addEventListener("click", $_onButtonClick);
    });
    // 再生終了イベント
    audioPlayer.audioSource.audio.addEventListener("ended", $_stop);
  };
  /**
   * ボタンをクリックした
   */
  var $_onButtonClick = function $_onButtonClick(ev) {
    ev.preventDefault();
    var btn = ev.currentTarget;
    if (btn === nowPlayingButton) {
      // console.log("onButtonClick 同じボタン");
      // console.log("再生中？", audioPlayer.isPlaying);
      if (audioPlayer.isPlaying) {
        $_changeElementState(btn, "pause");
      } else {
        $_changeElementState(btn, "play");
      }
      audioPlayer.pause();
    } else {
      // console.log("onButtonClick 違うボタン");
      $_play(btn);
      // console.log("再生中？", audioPlayer.isPlaying);
    }
  };
  /**
   * 再生
   */
  var $_play = function $_play(elm) {
    var url = elm.getAttribute($_opt.attrSource);
    var format = elm.getAttribute($_opt.attrFormat);
    $_stop();
    audioPlayer.play(url, format);
    nowPlayingButton = elm;
    $_changeElementState(elm, "play");
  };
  /**
   * 再生停止
   * 停止ボタンというものは無い
   * 再生中に他のボタンが再生された時に呼ばれる
   */
  var $_stop = function $_stop() {
    // console.log("停止");
    audioPlayer.stop();
    if (nowPlayingButton) {
      $_changeElementState(nowPlayingButton, "stop");
    }
    nowPlayingButton = undefined;
  };
  return {
    nowPlayingButton: nowPlayingButton,
    audioPlayer: audioPlayer,
    setButtonWithSelector: setButtonWithSelector
  };
};

exports.useAudioButton = useAudioButton;
//# sourceMappingURL=useAudioButton.js.map
