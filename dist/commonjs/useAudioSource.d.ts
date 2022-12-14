/**
 * ユーザー環境をチェックして、HDS / HLS / dash.js のソースを HTML5 Audio にセットする
 * MPEG-DASHを使う場合は dash.js が必要。
 *
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TMediaFormat, TAudioSourceOption } from "./types";
/**
 *
 * @param option
 */
declare const useAudioSource: (option?: TAudioSourceOption) => {
    audio: HTMLAudioElement;
    dashPlayer: any;
    setAudioSource: (url: string, type?: TMediaFormat | undefined) => boolean;
    readonly isSupportHds: boolean | undefined;
    readonly isSupportHls: boolean | undefined;
    readonly isSupportMse: boolean | undefined;
    readonly isSupportStream: boolean | undefined;
    readonly mediaFormat: TMediaFormat | undefined;
};
export { useAudioSource };
