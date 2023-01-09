/**
 * 一つのボタンで再生・一時停止・停止をするオーディオ再生ボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import { useAudioPlayer } from "./useAudioPlayer";
import { TMediaFormat, TAudioButtonOption, TPlayerState } from "./types";

// デフォルト設定
const DEFAULT: TAudioButtonOption = {
  // オーディオソースを指定する属性
  attrSource: "data-audio-src",
  // 状態を格納する属性
  attrState: "data-audio-state",
  // ソースのタイプを指定する属性 {mp3 / hds / hls / mse}
  attrFormat: "data-audio-format",
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
const useAudioButton = (option?: TAudioButtonOption) => {
  // 設定反映
  const $_opt = Object.assign(DEFAULT, option);
  // オーディオプレイヤー
  const audioPlayer = useAudioPlayer($_opt.sourceOption);
  // 現在再生中のボタンエレメント
  let nowPlayingButton: HTMLElement | undefined;
  // 対象エレメント一覧
  let $_targetElements: NodeList;

  /**
   * エレメントの状態を変更する
   */
  const $_changeElementState = (elm: HTMLElement, state: TPlayerState) => {
    elm.setAttribute($_opt.attrState as string, state);
  };

  /**
   * ボタンを設定する
   * @param selector querySelectorAll() で使う
   */
  const setButtonWithSelector = (selector: string) => {
    $_targetElements = document.querySelectorAll(selector);

    $_targetElements.forEach((elm) => {
      elm.addEventListener("click", $_onButtonClick);
    });

    // 再生終了イベント
    audioPlayer.audioSource.audio.addEventListener("ended", $_stop);
  };

  /**
   * ボタンをクリックした
   */
  const $_onButtonClick = (ev: Event) => {
    ev.preventDefault();
    const btn = ev.currentTarget as HTMLElement;

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
  const $_play = (elm: HTMLElement) => {
    const url = elm.getAttribute($_opt.attrSource as string) as string;
    const format = elm.getAttribute($_opt.attrFormat as string) as TMediaFormat;

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
  const $_stop = () => {
    // console.log("停止");
    audioPlayer.stop();

    if (nowPlayingButton) {
      $_changeElementState(nowPlayingButton, "stop");
    }
    nowPlayingButton = undefined;
  };

  return { nowPlayingButton, audioPlayer, setButtonWithSelector };
};

export { useAudioButton };
