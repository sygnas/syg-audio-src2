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
    elm: HTMLElement;
    index: number;
    option: TAudioControllerOption;
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
declare const useAudioControllerSingle: (payload: TAudioControllerSingleParams) => {
    setState: (state: TPlayerState) => void;
    setProgress: (per: number) => void;
    setHandlPlay: (func: THandlPlay) => void;
    setHandlProgress: (func: THandlProgress) => void;
    readonly index: number;
    readonly source: string;
    readonly format: TMediaFormat;
    readonly progress: number;
};
export { useAudioControllerSingle };
export type { TAudioControllerSingleInstance };
