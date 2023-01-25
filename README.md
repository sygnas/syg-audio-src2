# syg-simple-audio-player2

簡易なオーディオ再生ボタン

## Description

下記のモジュールにより構成されている。

- `useAudioController`
  - 再生ボタンとプログレスバーのコントローラー
- `useAudioButton`
  - ひとつのボタンで再生・一時停止をやるだけの
- `useAudioPlayer`
  - 簡単な制御を行う
- `useAudioSource`
  - 対応フォーマットのチェックおよびソース管理

MP3 / OGG / HDS / HLS / MSE 形式に対応。

## Latest Release

- 2023.01.26 : ver.2.0.0
  - useAudioController を追加
- 2023.01.12 : ver.1.2.0
  - hls.js に対応
- 2023.01.09 : ver.1.1.0
  - README.md 更新
- 2022.12.14 : ver.1.0.0
  - とりあえず作成

## Install

```sh
npm install --save @sygnas/simple-audio-player2
```

## Usage：簡単な例

### html

```html
<button
  class="js-audioplayer"
  data-audio-format="mp3"
  data-audio-state="stop"
  data-audio-src="voice_1.mp3"
>
  ボイス1
</button>

<button
  class="js-audioplayer"
  data-audio-format="mp3"
  data-audio-state="stop"
  data-audio-src="voice_2.mp3"
>
  ボイス2
</button>
```

### JavaScript

```js
import { useAudioButton } from "@sygnas/simple-audio-player2";

const audioButton = useAudioButton();
audioButton.setButtonWithSelector(".js-audioplayer");
```

## Usage：Vue で使う

### html

```html
<button @click="playVoice">再生</button>
```

### JavaScript

```js
import { useAudioPlayer } from "@sygnas/simple-audio-player2";

const audioPlayer = useAudioPlayer();

/**
 * 再生
 */
const playVoice = () => {
  if (audioPlayer.isPlaying) {
    audioPlayer.stop();
  } else {
    audioPlayer.play("voice_1.mp3", "mp3");
  }
};
```

## Usage：プログレスバーを表示させる

### html

```html
<div id="app-player" data-audio-src="xxxx.mp3" data-audio-format="mp3">
  <span class="playbtn"></span>

  <span class="progress-base">
    <span class="progress-bar"></span>
  </span>
</div>
```

### JavaScript

```js
import { useAudioController } from "@sygnas/simple-audio-player2";

export default function () {
  const audioController = useAudioController();
  audioController.setControllerWithSelector("#app-player");
}
```

---

## 音声ファイルの指定について

MP3 / OGG 形式は音声ファイルの URL をそのまま記述すれば良い。
HDS / HLS / MSE 形式はプレイリストが必要なため下記のように指定する。

### HDS 形式について

プレイリスト `htts://example.com/foo.mp3/manifest.f4m`
ソース指定 `htts://example.com/foo.mp3`

### HLS 形式について

プレイリスト `htts://example.com/foo.mp3/playlist.m3u8`
ソース指定 `htts://example.com/foo.mp3`

HLS 形式を使うには `hls.js` が必要。
https://github.com/video-dev/hls.js

```html
<!-- 下記をhtmlに追記する -->
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

### MSE 形式について

プレイリスト `htts://example.com/foo.mp3/manifest.mpd`
ソース指定 `htts://example.com/foo.mp3`

MSE 形式を使うには `dash.js` が必要。
https://github.com/Dash-Industry-Forum/dash.js

```html
<!-- 下記をhtmlに追記する -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.6.4/dash.all.min.js"></script>
```

---

## useAudioController

`useAudioPlayer` を使って再生ボタンとプログレスバーを作る。

見た目は何も定義していないので css を定義する必要がある。
プログレスバーの伸縮は `.progress-bar` に `scaleX()` を指定しているだけ。

```html
<div id="app-player" data-audio-src="xxxx.mp3" data-audio-format="mp3">
  <span class="playbtn"></span>

  <span class="progress-base">
    <span class="progress-bar"></span>
  </span>
</div>
```

### 属性

| attribute        | comment                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------- |
| data-audio-src   | 音声ファイルの URL を指定                                                                   |
| data-audio-type  | 音声ファイルのフォーマットを指定。`mp3`、`hds`、`hls`、`mse`から指定。OGG 形式は`mp3`と記述 |
| data-audio-state | 自動で追加される。状態が格納される。再生中 `play`、停止中 `stop`、一時停止中 `pause`        |

### クラス名

| className     | 役割                     |
| ------------- | ------------------------ |
| playbtn       | 再生ボタン               |
| progress-base | プログレスバーの枠       |
| progress-bar  | プログレスバーの伸縮部分 |

### メソッド

#### useAudioController(option?:TAudioControllerOption)

useAudioController のインスタンスを作成。

```js
import { useAudioController } from "@sygnas/simple-audio-player2";
const audioController = useAudioController();
```

##### オプション

| param         | default            | comment                        |
| ------------- | ------------------ | ------------------------------ |
| btnClassName  | ".playbtn"         | プレイボタンのクラス名         |
| baseClassName | ".progress-base"   | プログレスベースのクラス名     |
| barClassName  | ".progress-bar"    | プログレスバーのクラス名       |
| attrSource    | "data-audio-src"   | オーディオソースを指定する属性 |
| attrState     | "data-audio-state" | 状態を格納する属性             |
| attrFormat    | "data-audio-type"  | ソースのタイプを指定する属性   |
| sourceOption  |                    | useAudioSource 参照            |

#### setControllerWithSelector(selector:string)

オーディオコントローラーのセレクターを指定。
サンプルでは単体のコントローラーだが、複数同時にコントロールすることも可能。

```js
// `.js-controller` が複数あるなら全てがオーディオコントローラーとして動作する
audioButton.setControllerWithSelector(".js-controller");
```

### プロパティ

```js
// 再生中のコントローラー番号が表示される
console.log(audioButton.nowPlayingControllerIndex);
```

| property                  | comment                            |
| ------------------------- | ---------------------------------- |
| nowPlayingControllerIndex | 現在再生しているコントローラー番号 |

---

## useAudioButton

`useAudioPlayer` を使って簡易なオーディオ再生ボタンを作る。

### 属性

| attribute        | comment                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------- |
| data-audio-src   | 音声ファイルの URL を指定                                                                   |
| data-audio-state | 状態が格納される。再生中 `play`、停止中 `stop`、一時停止中 `pause`                          |
| data-audio-type  | 音声ファイルのフォーマットを指定。`mp3`、`hds`、`hls`、`mse`から指定。OGG 形式は`mp3`と記述 |

### メソッド

#### useAudioButton(option?:TAudioButtonOption)

useAudioButton のインスタンスを作成。

```js
import { useAudioButton } from "@sygnas/simple-audio-player2";
const audioButtom = useAudioButton();
```

##### オプション

| param        | default            | comment                        |
| ------------ | ------------------ | ------------------------------ |
| attrSource   | "data-audio-src"   | オーディオソースを指定する属性 |
| attrState    | "data-audio-state" | 状態を格納する属性             |
| attrFormat   | "data-audio-type"  | ソースのタイプを指定する属性   |
| sourceOption |                    | useAudioSource 参照            |

#### setButtonWithSelector(selector:string)

オーディオ再生ボタンのセレクターを指定。

```js
audioButton.setButtonWithSelector(".js-audioplayer");
```

### プロパティ

```js
// 再生中のボタンが表示される
console.log(audioButton.nowPlayingButton);
```

| property         | comment                         |
| ---------------- | ------------------------------- |
| nowPlayingButton | 現在再生しているボタン          |
| audioPlayer      | `useAudioPlayer` のインスタンス |

---

## useAudioPlayer()

`useAudioSource` に音声データを渡して再生・停止の管理。

### メソッド

#### useAudioPlayer(option?:TAudioSourceOption)

```js
import { useAudioPlayer } from "@sygnas/simple-audio-player2";
const audioPlayer = useAudioPlayer();
audioPlayer.play("foo.mp3", "mp3");
```

##### オプション

`useAudioSource` のオプション。

#### play(url:string, format:TMediaFormat)

オーディオを再生する。
`format` は `mp3`、`hds`、`hls`、`mse` のいずれかを指定。

#### stop()

オーディオを停止する。

#### pause()

オーディオを一時停止する。

### プロパティ

| property    | comment                         |
| ----------- | ------------------------------- |
| isPlaying   | `boolean` 再生中なら `true`     |
| audioSource | `useAudioSource` のインスタンス |

---

## useAudioSource

MP3、HLS、HDS、MSE 方式のオーディオソースを管理。
`useAudioPlayer` で使うものなので直接使うことは基本的にはない。

### メソッド

#### useAudioSource(option?:TAudioSourceOption)

```js
import { useAudioSource } from "@sygnas/simple-audio-player2";
const audioSource = useAudioSource(option);
audioSource.setAudioSource("foo.mp3", "mp3");
```

##### オプション

| param        | default          | comment                                      |
| ------------ | ---------------- | -------------------------------------------- |
| hds.playlist | "/manifest.f4m"  | HDS 方式のプレイリスト URL                   |
| hls.playlist | "/playlist.m3u8" | HLS 方式のプレイリスト URL                   |
| mse.playlist | "/manifest.mpd"  | MSE 方式のプレイリスト URL                   |
| mse.autoplay | false            | オーディオファイルを指定したらすぐ再生するか |

#### setAudioSource(url:string, type:TMediaFormat)

オーディオソースを渡して HTML5 Audio にセットする

### プロパティ

| property        | comment                                       |
| --------------- | --------------------------------------------- |
| audio           | HTML5 Audio                                   |
| dashPlayer      | dash.js のプレイヤー                          |
| isSupportHds    | HDS 形式をサポートするなら `true`             |
| isSupportHls    | HLS 形式をサポートするなら `true`             |
| isSupportMse    | MSE 形式をサポートするなら `true`             |
| isSupportStream | HDS / HLS / MSE のいずれかがサポート          |
| mediaFormat     | 　`setAudioSource()` で指定されたフォーマット |

---

## checkSupportFormat

ブラウザの対応フォーマットをチェックする。

```js
import { checkSupportFormat } from "@sygnas/simple-audio-player2";

const audio = new Audio();
isSupportHds = checkSupportFormat.hds(audio); // HDSを再生できるか
isSupportHls = checkSupportFormat.hls(audio); // HLSを再生できるか
isSupportMse = checkSupportFormat.mse(); // MedisSourceExtensionに対応しているか
```

## License

MIT
