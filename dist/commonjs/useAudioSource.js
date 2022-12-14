'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkSupportFormat = require('./checkSupportFormat.js');

/**
 * ユーザー環境をチェックして、HDS / HLS / dash.js のソースを HTML5 Audio にセットする
 * MPEG-DASHを使う場合は dash.js が必要。
 *
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
 * @param option
 */
var useAudioSource = function useAudioSource(option) {
  // 設定反映
  var $_opt = Object.assign(DEFAULT, option);
  // Audio Element
  var audio = new Audio();
  // dash.js のインスタンス
  var dashPlayer;
  // 対応フォーマット
  var $_isSupportHds; // HDSを再生できるか
  var $_isSupportHls; // HLSを再生できるか
  var $_isSupportMse; // MedisSourceExtensionに対応しているか
  var $_isSupportStream; // ストリーミング対応できるか
  // ソースとして設定されたフォーマット
  var $_mediaFormat;
  /**
   * サポート環境チェック
   */
  var $_checkSupport = function $_checkSupport() {
    try {
      $_isSupportHds = checkSupportFormat.checkSupportFormat.hds(audio); // HDSを再生できるか
      $_isSupportHls = checkSupportFormat.checkSupportFormat.hls(audio); // HLSを再生できるか
      $_isSupportMse = checkSupportFormat.checkSupportFormat.mse(); // MedisSourceExtensionに対応しているか
    } catch (e) {
      $_isSupportStream = false;
      return;
    }
    $_isSupportStream = true;
  };
  /**
   * 非ストリーミングでセットする
   */
  var $_setMp3Source = function $_setMp3Source(url) {
    audio.src = url;
    $_mediaFormat = "mp3";
    return true;
  };
  /**
   * HLS形式でセットする
   */
  var $_setHlsSource = function $_setHlsSource(url) {
    if (!$_isSupportHls) return false;
    audio.src = "".concat(url).concat($_opt.hls.playlist);
    $_mediaFormat = "hls";
    return true;
  };
  /**
   * HDS形式でセットする
   */
  var $_setHdsSource = function $_setHdsSource(url) {
    if (!$_isSupportHds) return false;
    audio.src = "".concat(url).concat($_opt.hds.playlist);
    $_mediaFormat = "hds";
    return true;
  };
  /**
   * MSE形式でセットする
   */
  var $_setMseSource = function $_setMseSource(url) {
    if (!$_isSupportMse) return false;
    // dash.js を使う
    $_mediaFormat = "mse";
    var src = "".concat(url).concat($_opt.mse.playlist);
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
   * @param {TMedia} type
   * タイプを指定したい時は TYPE_HDS などを渡す。
   * 非ストリーミングの場合は TYPE_FILE を必ず渡す。
   */
  var setAudioSource = function setAudioSource(url) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    if (type === "mp3") {
      return $_setMp3Source(url);
    } else if (type === "hls") {
      return $_setHlsSource(url);
    } else if (type === "hds") {
      return $_setHdsSource(url);
    } else if (type === "mse") {
      return $_setMseSource(url);
    } else if ($_isSupportHls) {
      return $_setHlsSource(url);
    } else if ($_isSupportHds) {
      return $_setHdsSource(url);
    } else if ($_isSupportMse) {
      return $_setMseSource(url);
    }
    return false;
  };
  // サポート環境をチェック
  $_checkSupport();
  return {
    audio: audio,
    dashPlayer: dashPlayer,
    setAudioSource: setAudioSource,
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
    }
  };
};

exports.useAudioSource = useAudioSource;
//# sourceMappingURL=useAudioSource.js.map
