/**
 * ユーザー環境をチェックして、HDS / HLS / dash.js のソースを HTML5 Audio にセットする
 * MPEG-DASHを使う場合は dash.js が必要。
 *
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TMediaFormat, TMediaSupport, TAudioSourceOption } from "./types";
/**
 *
 * @param option
 */
declare const useAudioSource: (option?: TAudioSourceOption) => {
    audio: HTMLAudioElement;
    dashPlayer: any;
    setAudioSource: (url: string, format?: TMediaFormat | undefined) => boolean;
    readonly isSupportHds: TMediaSupport;
    readonly isSupportHls: TMediaSupport;
    readonly isSupportMse: TMediaSupport;
    readonly isSupportStream: boolean;
    readonly mediaFormat: TMediaFormat | undefined;
};
export { useAudioSource };
