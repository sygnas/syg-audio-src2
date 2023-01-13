'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useAudioSource = require('./useAudioSource.js');

/**
 * オーディオ再生・停止だけを管理
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
// デフォルト設定
var DEFAULT = {
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
};
/**
 *
 */
var useAudioPlayer = function useAudioPlayer(option) {
  // 設定反映
  var $_opt = Object.assign(DEFAULT, option);
  // 再生中か
  var $_isPlaying = false;
  // オーディオソース
  var audioSource = useAudioSource.useAudioSource($_opt);
  /**
   * 停止
   */
  var stop = function stop() {
    audioSource.audio.pause();
    audioSource.audio.currentTime = 0;
    $_isPlaying = false;
    // console.log("AudioPlayer stop", $_isPlaying);
  };
  /**
   * 一時停止・再開
   */
  var pause = function pause() {
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
  var play = function play(url) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
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
      var err = new Error();
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
    audioSource: audioSource,
    play: play,
    stop: stop,
    pause: pause,
    get isPlaying() {
      return $_isPlaying;
    }
  };
};

exports.useAudioPlayer = useAudioPlayer;
//# sourceMappingURL=useAudioPlayer.js.map
