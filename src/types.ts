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

export type {
  TMediaFormat,
  TPlayerState,
  TAudioSourceOption,
  TAUdioButtonOption,
};

// type TModalOption = {
//   closeBtnText?: string;
//   classModal?: string;
//   classBg?: string;
//   classSlide?: string;
//   classContent?: string;
//   classClose?: string;
//   styleZIndex?: number;
//   transitionBaseName?: string;
// };

// type TControlOption = {
//   onOpen?: (id: string) => void;
//   onClose?: (id: string) => void;
// };

// interface IRef<T> {
//   value: T;
// }

// export type { TModalOption, TControlOption, IRef };
