/**
 * 一つのボタンで再生・一時停止・停止をするオーディオ再生ボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TMediaFormat, TAudioButtonOption } from "./types";
/**
 *
 */
declare const useAudioButton: (option?: TAudioButtonOption) => {
    nowPlayingButton: HTMLElement | undefined;
    audioPlayer: {
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
    setButtonWithSelector: (selector: string) => void;
};
export { useAudioButton };
