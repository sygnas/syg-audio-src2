/**
 * HDSを再生できるか
 * @param {Audio} audio
 * @return {Boolean} true : OK / false / NG
 */
const hds = (audio: HTMLAudioElement): boolean => {
  return audio.canPlayType("application/f4m+xml") === "maybe";
};

/**
 * HLSを再生できるか
 * @param {Audio} audio
 * @return {Boolean} true : OK / false / NG
 */
const hls = (audio: HTMLAudioElement): boolean => {
  return audio.canPlayType("application/vnd.apple.mpegURL") === "maybe";
};

/** ************
 * MediaSourceExtensionに対応しているか
 * @return {Boolean} true : OK / false / NG
 */
/* eslint no-void:["off"] */
const mse = (): boolean => {
  const myWindow = window as any;
  const hasWebKit =
    myWindow.WebKitMediaSource !== null &&
    myWindow.WebKitMediaSource !== void 0;
  const hasMediaSource =
    myWindow.MediaSource !== null && myWindow.MediaSource !== void 0;
  return hasWebKit || hasMediaSource;
};

const checkSupportFormat = {
  hds,
  hls,
  mse,
};

export { checkSupportFormat };
