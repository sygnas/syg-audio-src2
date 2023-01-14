/**
 * 対応環境確認
 * chrome でHLS対応するには hls.js が必要
 * https://github.com/video-dev/hls.js
 */
/**
 * HDSを再生できるか
 * @param {Audio} audio
 * @return {TMediaSupport}
 */
var hds = function hds(audio) {
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
var hls = function hls(audio) {
  if (audio.canPlayType("application/vnd.apple.mpegURL") === "maybe") {
    // console.log("check HLS native");
    return "native";
  } else if (Hls.isSupported()) {
    // console.log("check HLS polyfill");
    return "polyfill";
  }
  // console.log("check HLS none");
  return "none";
};
/** ************
 * MediaSourceExtensionに対応しているか
 * @return {TMediaSupport}
 */
/* eslint no-void:["off"] */
var mse = function mse() {
  var myWindow = window;
  var hasWebKit = myWindow.WebKitMediaSource !== null && myWindow.WebKitMediaSource !== void 0;
  var hasMediaSource = myWindow.MediaSource !== null && myWindow.MediaSource !== void 0;
  // return hasWebKit || hasMediaSource;
  if (hasWebKit || hasMediaSource) {
    return "polyfill";
  }
  return "none";
};
var checkSupportFormat = {
  hds: hds,
  hls: hls,
  mse: mse
};

export { checkSupportFormat };
//# sourceMappingURL=checkSupportFormat.js.map
