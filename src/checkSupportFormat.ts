/**
 * 対応環境確認
 * chrome でHLS対応するには hls.js が必要
 * https://github.com/video-dev/hls.js
 */

import { TMediaSupport } from "./types";

/* globals Hls */
declare var Hls: any;

/**
 * HDSを再生できるか
 * @param {Audio} audio
 * @return {TMediaSupport}
 */
const hds = (audio: HTMLAudioElement): TMediaSupport => {
  if (audio.canPlayType("application/f4m+xml") === "maybe") {
    return "native";
  }
  return "none";
};

/**
 * HLSを再生できるか
 * @param {Audio} audio
 * @return {TMediaSupport}
 */
const hls = (audio: HTMLAudioElement): TMediaSupport => {
  if (audio.canPlayType("application/vnd.apple.mpegURL") === "maybe") {
    console.log("check HLS native");
    return "native";
  } else if (Hls.isSupported()) {
    console.log("check HLS polyfill");
    return "polyfill";
  }
  console.log("check HLS none");
  return "none";
};

/** ************
 * MediaSourceExtensionに対応しているか
 * @return {TMediaSupport}
 */
/* eslint no-void:["off"] */
const mse = (): TMediaSupport => {
  const myWindow = window as any;
  const hasWebKit =
    myWindow.WebKitMediaSource !== null &&
    myWindow.WebKitMediaSource !== void 0;
  const hasMediaSource =
    myWindow.MediaSource !== null && myWindow.MediaSource !== void 0;
  // return hasWebKit || hasMediaSource;

  if (hasWebKit || hasMediaSource) {
    return "polyfill";
  }
  return "none";
};

const checkSupportFormat = {
  hds,
  hls,
  mse,
};

export { checkSupportFormat };
