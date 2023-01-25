/**
 * 再生ボタンとプログレスバーと時間
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TAudioControllerOption } from "./types";
/**
 *
 */
declare const useAudioController: (option?: TAudioControllerOption) => {
    setControllerWithSelector: (selector: string) => void;
    readonly nowPlayingControllerIndex: number | undefined;
};
export { useAudioController };
