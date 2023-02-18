---
title: 'ブラウザで画面録画した内容をStreaming配信をする際の構成について'
createdAt: '2023-02-19'
updatedAt: '2023-02-19'
description: 'ブラウザで画面録画した内容をStreaming配信をする際の構成について'
---

## モチベーション

副業先で動画周りの実装を行うことが多いので、それらの知識を体系的にまとめて理解していきたい。

TODO: まとめきれていないので、都度都度更新予定(2023/02/18)

## クライアント側で動画データの取得

### MediaStream の取得

Web API の `navigator.mediaDevices.getDisplayMedia()` を利用して stream を取得する。返り値の Promise を解決することにより、画面情報と音声情報を内包した MediaStream を取得することができる。

```
const constraints = { video: true, audio: true };
let captureStream = null;

try {
  captureStream = await navigator.mediaDevices.getDisplayMedia(constraints);
} catch(err) {
  console.error("Error: " + err);
}
```

ref: https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getDisplayMedia

> MediaStream インターフェイスは、メディアコンテンツのストリームを表します。ストリームは動画や音声など複数のトラックから成ります。それぞれのトラックは MediaStreamTrack のインスタンスとして定義されます。

ref: https://developer.mozilla.org/ja/docs/Web/API/MediaStream

MediaStream は上記のように定義されており、選択した画面と音声のトラックから成り立つストリームを取得する。これをもとに、MediaRecorder の init を行う。

### MediaRecorder を定義

MDN ドキュメントによると、MediaRecorder は以下のように定義されている。

> MediaRecorder は MediaStream 収録 API のインターフェイスで、メディアを簡単に収録するための機能を提供します。 これは、MediaRecorder() コンストラクターを使用して作成します。

ref: https://developer.mozilla.org/ja/docs/Web/API/MediaRecorder

MediaRecorder を利用して、メディアデータを取得する。データは一定時間おきに、Blob データとして生成されるので、それをキャッチするために ondataavailable イベントをセットする。

```
const mediaRecorder = new MediaRecorder(captureStream);

let chunks = [];
mediaRecorder.ondataavailable = event => {
  chunks.push(event.data);
};

mediaRecorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  // blob を送信
};

mediaRecorder.start();
// 録画を停止する場合は、mediaRecorder.stop() を呼び出す
```

## Stream 配信するための構成

まず、動画を Stream 配信するためには、それ用のフォーマットに変換する必要がある。代表的なフォーマットは HLS や MPEG-DASH があげられる。

ref: https://ygoto3.com/posts/streaming-technology-basics-for-frontend-engineers/

動画変換に関しては、AWS であれば以下のようなサービスを利用することができる。例えば、mp4 ファイルを HLS に変換したりすることができる。

ref: https://aws.amazon.com/jp/mediaconvert/

一例として、動画のアップロード機能を作る際を上げると、

- web アプリケーション画面で動画をアップロード
- ボタン押下時に api にリクエストして S3 に mp4 ファイルを格納
- ファイルが格納されたタイミングで lambda を発火、アップロードされた動画を HLS に変換する

みたいな流れでストリーミング用の動画ファイルを生成することができる。

また、上記記したように、MediaRecorder からストリーミング用データを生成する際は、取得したデータを処理して webm や mp4 に変換してから同じプロセスを辿ればいい。

クライアントでも動画を再生するためのプレイヤーを準備する必要がある。既に以下のようなライブラリも存在しており、利用すればスムーズに実現することができる。

https://github.com/shaka-project/shaka-player

## 所感

実務ベースで覚えていることをまとめてはみたものの、全然覚えていない箇所と理解度が薄い箇所がありそうなので、どこかで小さくプロダクトでも作りながら学びを深めていきたい
