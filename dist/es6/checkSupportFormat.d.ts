/**
 * 対応環境確認
 * chrome でHLS対応するには hls.js が必要
 * https://github.com/video-dev/hls.js
 */
import { TMediaSupport } from "./types";
declare const checkSupportFormat: {
    hds: (audio: HTMLAudioElement) => TMediaSupport;
    hls: (audio: HTMLAudioElement) => TMediaSupport;
    mse: () => TMediaSupport;
};
export { checkSupportFormat };
