/**
 * 再生ボタンとプログレスバーと時間
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import { useAudioPlayer } from "./useAudioPlayer";
import {
  useAudioControllerSingle,
  TAudioControllerSingleInstance,
} from "./useAudioControllerSingle";
import { TMediaFormat, TAudioControllerOption, TPlayerState } from "./types";

const PROGRESS_INTERVAL = 50;

// デフォルト設定
const DEFAULT: TAudioControllerOption = {
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
      playlist: "/manifest.f4m",
    },
    hls: {
      playlist: "/playlist.m3u8",
    },
    mse: {
      playlist: "/manifest.mpd",
      autoplay: false,
    },
  },
};

/**
 *
 */
const useAudioController = (option?: TAudioControllerOption) => {
  // 設定反映
  const $_opt = Object.assign(DEFAULT, option);
  // オーディオプレイヤー
  const audioPlayer = useAudioPlayer($_opt.sourceOption);
  const audio = audioPlayer.audioSource.audio;
  // コントローラー一覧
  const $_controllerList: TAudioControllerSingleInstance[] = [];
  // 現在再生中のコントローラーindex
  let $_nowPlayingIndex: number | undefined;
  // プログレスバー更新のインターバル
  let $_progressIntervalId: number;
  // 音声ファイルの長さ
  let $_duration = 0;

  /**
   * 再生中にプログレスバーの状態を変更する
   */
  const $_startProgress = () => {
    const controller = $_controllerList[$_nowPlayingIndex as number];

    $_progressIntervalId = window.setInterval(() => {
      const total = audio.duration;
      const current = audio.currentTime;
      const per = current / total;
      controller.setProgress(per);
    }, PROGRESS_INTERVAL);
  };

  /**
   * プログレスバーの動きを止める
   */
  const $_stopProgress = () => {
    clearInterval($_progressIntervalId);
  };

  /**
   * プレイボタンをクリック
   */
  const $_onClickPlayBtn = (index: number) => {
    const targetController = $_controllerList[index];

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
  const $_onClickProgressBar = (index: number, per: number) => {
    // 再生位置位置移動
    // console.log("click progress", audio.duration, per);

    if (index !== $_nowPlayingIndex) {
      $_stop();
    }

    if (audioPlayer.isPlaying) {
      audio.currentTime = audio.duration * per;
    } else {
      const targetController = $_controllerList[index];
      audioPlayer.play(targetController.source, targetController.format);
      targetController.setState("play");
      $_nowPlayingIndex = index;
    }
  };

  /**
   * 停止
   */
  const $_stop = () => {
    audioPlayer.stop();
    $_duration = 0;
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
  const setControllerWithSelector = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    let index = 0;

    elements.forEach((elm) => {
      // オーディオコントローラー本体
      const controller = useAudioControllerSingle({
        elm: elm as HTMLElement,
        index: index,
        option: $_opt,
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
    audio.addEventListener("loadeddata", () => {
      // プログレスバーの位置から始める
      const controller = $_controllerList[$_nowPlayingIndex || 0];
      const per = controller.progress;
      audio.currentTime = audio.duration * per;
      // console.log("loadeddata", audio.duration, per);
      $_startProgress();
    });

    // 再生開始
    audio.addEventListener("play", () => {
      $_startProgress();
    });

    // 一時停止
    audio.addEventListener("pause", () => {
      $_stopProgress();
    });
  };

  return {
    setControllerWithSelector,
    get nowPlayingControllerIndex() {
      return $_nowPlayingIndex;
    },
  };
};

export { useAudioController };
