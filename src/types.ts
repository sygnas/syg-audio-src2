type TMediaFormat = "mp3" | "hds" | "hls" | "mse";
type TMediaSupport = "native" | "polyfill" | "none";

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

type TAudioButtonOption = {
  attrSource?: string;
  attrState?: string;
  attrFormat?: string;
  sourceOption?: TAudioSourceOption;
};

export type {
  TMediaFormat,
  TMediaSupport,
  TPlayerState,
  TAudioSourceOption,
  TAudioButtonOption,
};
