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
        setAudioSource: (url: string, type?: TMediaFormat | undefined) => boolean;
        readonly isSupportHds: boolean | undefined;
        readonly isSupportHls: boolean | undefined;
        readonly isSupportMse: boolean | undefined;
        readonly isSupportStream: boolean | undefined;
        readonly mediaFormat: TMediaFormat | undefined;
    };
    play: (url: string, format: TMediaFormat) => boolean;
    stop: () => void;
    pause: () => void;
    readonly isPlaying: boolean;
};
export { useAudioPlayer };
