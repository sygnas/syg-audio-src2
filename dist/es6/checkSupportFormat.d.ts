declare const checkSupportFormat: {
    hds: (audio: HTMLAudioElement) => boolean;
    hls: (audio: HTMLAudioElement) => boolean;
    mse: () => boolean;
};
export { checkSupportFormat };
