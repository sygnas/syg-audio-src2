type TMediaFormat = "mp3" | "hds" | "hls" | "mse";
type TPlayerState = "play" | "pause" | "stop";
type TAudioSourceOption = {
    hds: {
        playlist: string;
    };
    hls: {
        playlist: string;
    };
    mse: {
        playlist: string;
        autoplay: boolean;
    };
};
type TAUdioButtonOption = {
    attrSource?: string;
    attrState?: string;
    attrFormat?: string;
    sourceOption?: TAudioSourceOption;
};
export type { TMediaFormat, TPlayerState, TAudioSourceOption, TAUdioButtonOption, };
