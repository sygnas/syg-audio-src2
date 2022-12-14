# syg-simple-audio-player2

簡易なオーディオ再生ボタン

## Description

## Latest Release

- 2022.12.14 : ver.1.0.0
  - とりあえず作成

## Usage

### Install

```sh
npm install --save @sygnas/simple-audio-player2
```

### html / JS

```html
<button
  class="js-audioplayer"
  data-audio-src="voice_1.mp3"
  data-audio-format="mp3"
  data-audio-state="stop"
>
  再生</button
><br />
<button
  class="js-audioplayer"
  data-audio-src="voice_2.mp3"
  data-audio-format="mp3"
  data-audio-state="stop"
>
  再生
</button>
```

```javascript
import { useAudioButton } from "@sygnas/simple-audio-player2";

const audioButton = useAudioButton();
audioButton.setButtonWithSelector(".js-audioplayer");
```

### Attributes

#### option

## useAudioButton

`useAudioPlayer` を使って簡易なオーディオ再生ボタンを作る。

## useAudioPlayer

`useAudioSource` に音声データを渡して再生・停止の管理。

## useAudioSource

MP3、HLS、HDS、MSE 方式のオーディオソースを管理。

## checkSupportFormat

ブラウザの対応フォーマットをチェックする。

## License

MIT
