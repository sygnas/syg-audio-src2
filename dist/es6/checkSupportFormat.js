/**
 * HDSを再生できるか
 * @param {Audio} audio
 * @return {Boolean} true : OK / false / NG
 */
var hds = function hds(audio) {
  return audio.canPlayType("application/f4m+xml") === "maybe";
};
/**
 * HLSを再生できるか
 * @param {Audio} audio
 * @return {Boolean} true : OK / false / NG
 */
var hls = function hls(audio) {
  return audio.canPlayType("application/vnd.apple.mpegURL") === "maybe";
};
/** ************
 * MediaSourceExtensionに対応しているか
 * @return {Boolean} true : OK / false / NG
 */
/* eslint no-void:["off"] */
var mse = function mse() {
  var myWindow = window;
  var hasWebKit = myWindow.WebKitMediaSource !== null && myWindow.WebKitMediaSource !== void 0;
  var hasMediaSource = myWindow.MediaSource !== null && myWindow.MediaSource !== void 0;
  return hasWebKit || hasMediaSource;
};
var checkSupportFormat = {
  hds: hds,
  hls: hls,
  mse: mse
};

export { checkSupportFormat };
//# sourceMappingURL=checkSupportFormat.js.map
