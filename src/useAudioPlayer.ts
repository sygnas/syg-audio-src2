/**
 * オーディオ再生・停止だけを管理
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import { useAudioSource } from "./useAudioSource";
import { TMediaFormat, TAudioSourceOption } from "./types";

// デフォルト設定
const DEFAULT: TAudioSourceOption = {
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
};

/**
 *
 */
const useAudioPlayer = (option?: TAudioSourceOption) => {
  // 設定反映
  const $_opt = Object.assign(DEFAULT, option);
  // 再生中か
  let $_isPlaying = false;
  // オーディオソース
  const audioSource = useAudioSource($_opt);

  /**
   * 停止
   */
  const stop = () => {
    audioSource.audio.pause();
    audioSource.audio.currentTime = 0;
    $_isPlaying = false;
    // console.log("AudioPlayer stop", $_isPlaying);
  };

  /**
   * 一時停止・再開
   */
  const pause = () => {
    // console.log("AudioPlayer pause 1", $_isPlaying);
    if ($_isPlaying) {
      audioSource.audio.pause();
      $_isPlaying = false;
    } else {
      audioSource.audio.play();
      $_isPlaying = true;
    }
    // console.log("AudioPlayer pause 2", $_isPlaying);
  };

  /**
   * 再生
   * @return boolean 再生に成功したら true
   */
  const play = (url: string, format: TMediaFormat | undefined = undefined) => {
    // すでに再生中なら止める
    if ($_isPlaying) {
      $_isPlaying = false;
      audioSource.audio.pause();
    }

    // ・format が mp3 だったら非ストリーミング
    // ・format が null で、サポート環境チェックが問題なければストリーミング種別自動判定
    // ・hds / hls / mse を指定したらストリーミング
    // ・それ以外はエラー
    if (format === "mp3") {
      audioSource.setAudioSource(url, format);
    } else if (format === "hds" || format === "hls" || format === "mse") {
      audioSource.setAudioSource(url, format);
    } else if (format === null && audioSource.isSupportStream) {
      audioSource.setAudioSource(url);
    } else {
      const err = new Error();
      err.message = "not supported type.";
      throw err;
    }

    // ソースをロードして再生
    audioSource.audio.load();
    audioSource.audio.play();
    $_isPlaying = true;
    // console.log("AudioPlayer play", $_isPlaying);

    return true;
  };

  return {
    audioSource,
    play,
    stop,
    pause,
    get isPlaying() {
      return $_isPlaying;
    },
  };
};

export { useAudioPlayer };
