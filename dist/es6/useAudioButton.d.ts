/**
 * 一つのボタンで再生・一時停止・停止をするオーディオ再生ボタン
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
import { TMediaFormat, TAUdioButtonOption } from "./types";
/**
 *
 */
declare const useAudioButton: (option?: TAUdioButtonOption) => {
    nowPlayingButton: HTMLElement | undefined;
    audioPlayer: {
        /**
         * 再生
         */
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
    setButtonWithSelector: (selector: string) => void;
};
export { useAudioButton };
