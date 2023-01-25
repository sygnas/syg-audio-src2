'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * コントローラー単体
 * 必ず useAudioController から呼び出して使う
 * ここでは実際のオーディオ処理は行わず、ボタンとプログレスバーの処理だけ行う
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
/**
 *
 */
var useAudioControllerSingle = function useAudioControllerSingle(payload) {
  // 設定反映
  var $_opt = payload.option;
  // 管理番号
  var $_index = payload.index;
  // ボタンとか
  var $_element = payload.elm;
  var $_playBtn = $_element.querySelector($_opt.btnClassName);
  var $_progressBase = $_element.querySelector($_opt.baseClassName);
  var $_progressBar = $_element.querySelector($_opt.barClassName);
  // 再生開始イベントハンドラ
  var $_handlPlay;
  // プログレスバーイベントハンドラ
  var $_handlProgress;
  ////////////////////////////////////////
  ////////////////////////////////////////
  /**
   * 再生開始イベントハンドラ登録
   */
  var setHandlPlay = function setHandlPlay(func) {
    $_handlPlay = func;
  };
  /**
   * プログレスバーイベントハンドラ登録
   */
  var setHandlProgress = function setHandlProgress(func) {
    $_handlProgress = func;
  };
  /**
   * 状態を変更する
   */
  var setState = function setState(state) {
    $_element.setAttribute($_opt.attrState, state);
    if (state === "stop") {
      setProgress(0);
    }
  };
  /**
   * プログレスバーの％を指定する
   */
  var setProgress = function setProgress(per) {
    $_progressBar.style.transform = "scaleX(".concat(per, ")");
  };
  /**
   * プログレスバーの％を取得する
   */
  var $_getProgress = function $_getProgress() {
    var baseRect = $_progressBase.getBoundingClientRect();
    var barRect = $_progressBar.getBoundingClientRect();
    return Math.floor(barRect.width / baseRect.width * 1000) / 1000;
  };
  /**
   * ボタンをクリックした
   */
  var $_onButtonClick = function $_onButtonClick() {
    // console.log("click btn", $_index);
    $_handlPlay($_index);
  };
  /**
   * プログレスバーをクリックした
   */
  var $_onProgressClick = function $_onProgressClick(ev) {
    ev.currentTarget;
    // クリック座標取得
    var pageX = ev.pageX;
    var clientRect = $_progressBase.getBoundingClientRect();
    var posX = clientRect.left + window.pageXOffset;
    var clickX = pageX - posX;
    // バーの何％の位置か
    var per = Math.floor(clickX / clientRect.width * 1000) / 1000;
    // console.log("click progress", $_index, per);
    setProgress(per);
    $_handlProgress($_index, per);
  };
  ////////////////////////////////////////
  ////////////////////////////////////////
  // ボタンイベント登録
  $_playBtn.addEventListener("click", $_onButtonClick);
  $_progressBase.addEventListener("click", $_onProgressClick);
  setState("stop");
  return {
    setState: setState,
    setProgress: setProgress,
    setHandlPlay: setHandlPlay,
    setHandlProgress: setHandlProgress,
    get index() {
      return $_index;
    },
    get source() {
      return $_element.getAttribute($_opt.attrSource);
    },
    get format() {
      return $_element.getAttribute($_opt.attrFormat);
    },
    get progress() {
      return $_getProgress();
    }
  };
};

exports.useAudioControllerSingle = useAudioControllerSingle;
//# sourceMappingURL=useAudioControllerSingle.js.map
