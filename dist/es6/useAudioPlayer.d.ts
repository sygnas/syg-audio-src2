/**
 * オーディオ再生・停止だけを管理
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TMediaFormat, TAudioSourceOption } from "./types";
/**
 *
 */
declare const useAudioPlayer: (option?: TAudioSourceOption) => {
    audioSource: {
        audio: HTMLAudioElement;
        dashPlayer: any;
        setAudioSource: (url: string, format?: TMediaFormat | undefined) => boolean;
        readonly isSupportHds: import("./types").TMediaSupport;
        readonly isSupportHls: import("./types").TMediaSupport;
        readonly isSupportMse: import("./types").TMediaSupport;
        readonly isSupportStream: boolean;
        readonly mediaFormat: TMediaFormat | undefined;
    };
    play: (url: string, format?: TMediaFormat | undefined) => boolean;
    stop: () => void;
    pause: () => void;
    readonly isPlaying: boolean;
};
export { useAudioPlayer };
