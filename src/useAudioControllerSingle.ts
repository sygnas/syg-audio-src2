/**
 * コントローラー単体
 * 必ず useAudioController から呼び出して使う
 * ここでは実際のオーディオ処理は行わず、ボタンとプログレスバーの処理だけ行う
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import { TAudioControllerOption, TMediaFormat, TPlayerState } from "./types";

type TAudioControllerSingleParams = {
  elm: HTMLElement; // 対象となるHTMLElement
  index: number; // オーディオコントローラーの管理番号
  option: TAudioControllerOption; // オプション
};

type THandlPlay = (index: number) => void;
type THandlProgress = (index: number, per: number) => void;

type TAudioControllerSingleInstance = {
  setState: (state: TPlayerState) => void;
  setProgress: (per: number) => void;
  setHandlPlay: (func: THandlPlay) => void;
  setHandlProgress: (func: THandlProgress) => void;
  readonly index: number;
  readonly source: string;
  readonly format: TMediaFormat;
  readonly progress: number;
};

/**
 *
 */
const useAudioControllerSingle = (payload: TAudioControllerSingleParams) => {
  // 設定反映
  const $_opt = payload.option;
  // 管理番号
  const $_index = payload.index;
  // ボタンとか
  const $_element: HTMLElement = payload.elm;
  const $_playBtn = $_element.querySelector(
    $_opt.btnClassName as string
  ) as HTMLElement;
  const $_progressBase = $_element.querySelector(
    $_opt.baseClassName as string
  ) as HTMLElement;
  const $_progressBar = $_element.querySelector(
    $_opt.barClassName as string
  ) as HTMLElement;

  // 再生開始イベントハンドラ
  let $_handlPlay: THandlPlay;
  // プログレスバーイベントハンドラ
  let $_handlProgress: THandlProgress;

  ////////////////////////////////////////
  ////////////////////////////////////////

  /**
   * 再生開始イベントハンドラ登録
   */
  const setHandlPlay = (func: THandlPlay) => {
    $_handlPlay = func;
  };

  /**
   * プログレスバーイベントハンドラ登録
   */
  const setHandlProgress = (func: THandlProgress) => {
    $_handlProgress = func;
  };

  /**
   * 状態を変更する
   */
  const setState = (state: TPlayerState) => {
    $_element.setAttribute($_opt.attrState as string, state);

    if (state === "stop") {
      setProgress(0);
    }
  };

  /**
   * プログレスバーの％を指定する
   */
  const setProgress = (per: number) => {
    $_progressBar.style.transform = `scaleX(${per})`;
  };

  /**
   * プログレスバーの％を取得する
   */
  const $_getProgress = (): number => {
    const baseRect = $_progressBase.getBoundingClientRect();
    const barRect = $_progressBar.getBoundingClientRect();
    return Math.floor((barRect.width / baseRect.width) * 1000) / 1000;
  };

  /**
   * ボタンをクリックした
   */
  const $_onButtonClick = () => {
    // console.log("click btn", $_index);
    $_handlPlay($_index);
  };

  /**
   * プログレスバーをクリックした
   */
  const $_onProgressClick = (ev: MouseEvent) => {
    const base = ev.currentTarget as HTMLElement;

    // クリック座標取得
    const pageX = ev.pageX;
    const clientRect = $_progressBase.getBoundingClientRect();
    const posX = clientRect.left + window.pageXOffset;
    const clickX = pageX - posX;

    // バーの何％の位置か
    const per = Math.floor((clickX / clientRect.width) * 1000) / 1000;
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
    setState,
    setProgress,
    setHandlPlay,
    setHandlProgress,
    get index(): number {
      return $_index;
    },
    get source(): string {
      return $_element.getAttribute($_opt.attrSource as string) as string;
    },
    get format(): TMediaFormat {
      return $_element.getAttribute($_opt.attrFormat as string) as TMediaFormat;
    },
    get progress(): number {
      return $_getProgress();
    },
  };
};

export { useAudioControllerSingle };
export type { TAudioControllerSingleInstance };
