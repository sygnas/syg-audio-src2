/**
 * ユーザー環境をチェックして、HDS / HLS / dash.js のソースを HTML5 Audio にセットする
 * MPEG-DASHを使う場合は dash.js が必要。
 *
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

/* globals dashjs */
declare var dashjs: any;
/* globals Hls */
declare var Hls: any;

import { checkSupportFormat } from "./checkSupportFormat";
import { TMediaFormat, TMediaSupport, TAudioSourceOption } from "./types";

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
 * @param option
 */
const useAudioSource = (option?: TAudioSourceOption) => {
  // 設定反映
  const $_opt = Object.assign(DEFAULT, option);

  // Audio Element
  const audio = new Audio();

  // dash.js のインスタンス
  let dashPlayer: any;
  // hls.js のインスタンス
  let hls: any;

  // 対応フォーマット
  let $_isSupportHds: TMediaSupport; // HDSを再生できるか
  let $_isSupportHls: TMediaSupport; // HLSを再生できるか
  let $_isSupportMse: TMediaSupport; // MedisSourceExtensionに対応しているか
  let $_isSupportStream: boolean; // ストリーミング対応できるか

  // ソースとして設定されたフォーマット
  let $_mediaFormat: TMediaFormat | undefined;

  /**
   * サポート環境チェック
   */
  const $_checkSupport = () => {
    try {
      $_isSupportHds = checkSupportFormat.hds(audio); // HDSを再生できるか
      $_isSupportHls = checkSupportFormat.hls(audio); // HLSを再生できるか
      $_isSupportMse = checkSupportFormat.mse(); // MedisSourceExtensionに対応しているか
    } catch (e) {
      $_isSupportStream = false;
      return;
    }
    $_isSupportStream = true;
  };

  /**
   * 非ストリーミングでセットする
   */
  const $_setMp3Source = (url: string) => {
    audio.src = url;
    $_mediaFormat = "mp3";
    return true;
  };

  /**
   * HLS形式でセットする
   */
  const $_setHlsSource = (url: string) => {
    if ($_isSupportHls === "none") return false;
    console.log("support HLS");

    const src = `${url}${$_opt.hls.playlist}`;
    console.log("$_setHlsSource", src);

    if ($_isSupportHls === "native") {
      audio.src = src;
    } else if ($_isSupportHls === "polyfill") {
      if (hls === undefined) {
        hls = new Hls();
        hls.attachMedia(audio);
      }
      hls.loadSource(src);
    }
    console.log(audio.src);
    $_mediaFormat = "hls";
    return true;
  };

  /**
   * HDS形式でセットする
   */
  const $_setHdsSource = (url: string) => {
    if ($_isSupportHds === "none") return false;

    audio.src = `${url}${$_opt.hds.playlist}`;
    $_mediaFormat = "hds";
    return true;
  };

  /**
   * MSE形式でセットする
   */
  const $_setMseSource = (url: string) => {
    if ($_isSupportMse === "none") return false;

    // dash.js を使う
    $_mediaFormat = "mse";
    const src = `${url}${$_opt.mse.playlist}`;

    if (dashPlayer === undefined) {
      dashPlayer = dashjs.MediaPlayer().create();
      dashPlayer.initialize(audio, src, $_opt.mse.autoplay);
    } else {
      dashPlayer.attachSource(src);
    }
    return true;
  };

  /**
   * オーディオソースを渡してHTML5 Audioにセットする
   * @param {String} url
   * mp3/ogg など非ストリーミングの場合はファイルのURL。
   * ストリーミングの場合は {http://ホニャララ}/manifest.f4m をベースURLとして渡す
   * @param {TMediaFormat} format
   * フォーマットを指定したい時は mp3 / hls / hds / mse のいずれかを渡す。
   * 非ストリーミングの場合は mp3 を必ず渡す。
   */
  const setAudioSource = (
    url: string,
    format: TMediaFormat | undefined = undefined
  ) => {
    console.log("setAudioSource", url, format);
    if (format === "mp3") {
      return $_setMp3Source(url);
    } else if (format === "hls") {
      return $_setHlsSource(url);
    } else if (format === "hds") {
      return $_setHdsSource(url);
    } else if (format === "mse") {
      return $_setMseSource(url);
    } else if ($_isSupportHls !== "none") {
      return $_setHlsSource(url);
    } else if ($_isSupportHds !== "none") {
      return $_setHdsSource(url);
    } else if ($_isSupportMse !== "none") {
      return $_setMseSource(url);
    }
    return false;
  };

  // サポート環境をチェック
  $_checkSupport();

  return {
    audio,
    dashPlayer,
    setAudioSource,
    get isSupportHds() {
      return $_isSupportHds;
    },
    get isSupportHls() {
      return $_isSupportHls;
    },
    get isSupportMse() {
      return $_isSupportMse;
    },
    get isSupportStream() {
      return $_isSupportStream;
    },
    get mediaFormat() {
      return $_mediaFormat;
    },
  };
};

export { useAudioSource };
