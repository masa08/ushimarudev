---
title: 'ブラウザ画面録画データをストリーミング配信をする際のメモ'
createdAt: '2023-02-18'
updatedAt: '2023-02-19'
description: 'ブラウザ画面録画データをストリーミング配信をする際のメモ'
---

## モチベーション

副業先で動画周りの実装を行うことが多いので、それらの知識を体系的にまとめて理解していきたい。

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

MediaStream は下記のように定義されており、選択した画面と音声のトラックから成り立つストリームを取得する。これをもとに、MediaRecorder の init を行う。

> MediaStream インターフェイスは、メディアコンテンツのストリームを表します。ストリームは動画や音声など複数のトラックから成ります。それぞれのトラックは MediaStreamTrack のインスタンスとして定義されます。

ref: https://developer.mozilla.org/ja/docs/Web/API/MediaStream

### MediaRecorder を init

MDN ドキュメントによると、MediaRecorder は以下のように定義されている。

> MediaRecorder は MediaStream 収録 API のインターフェイスで、メディアを簡単に収録するための機能を提供します。 これは、MediaRecorder() コンストラクターを使用して作成します。

ref: https://developer.mozilla.org/ja/docs/Web/API/MediaRecorder

MediaRecorder を利用して、メディアデータを取得する。データは一定時間おきに、Blob データとして生成されるので、それをキャッチするために ondataavailable イベントをセットする。
また、終了時に発火する callback を onstop に定義する。動画撮影が終了したタイミングで、まとめて data を api に送る際などはここに記述する。

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

## ストリーミング 配信するための構成

まず、動画を ストリーミング 配信するためには、それ用のフォーマットに変換する必要がある。代表的なフォーマットは HLS や MPEG-DASH があげられる。ストリーミング配信を実現する技術に関しては以下の記事に詳しく記述されている。

ref: https://ygoto3.com/posts/streaming-technology-basics-for-frontend-engineers/

ストリーミング配信をするために、mp4 や webm のデータを上記フォーマットに変換する必要がある。ffmpeg を使って変換することもできるが、既に提供されているサービスを使った方がローコストで実装できる。
一例として、AWS であれば MediaConvert を利用することができる。このサービスを使えば、config を記入するだけで、mp4 動画を HLS に変換することができる。

ref: https://aws.amazon.com/jp/mediaconvert/

また、生成された HLS 形式の動画を再生するためには、クライアントでも動画を再生するためのプレイヤーを準備する必要がある。既に以下のようなライブラリも存在しており、利用すればスムーズに実現することができる。

https://github.com/shaka-project/shaka-player

実装の一例として、動画のアップロード機能を作る際を上げると、

- Web アプリケーション画面で mp4 動画をアップロード
- アップロードボタン押下時に api にリクエストして S3 に mp4 ファイルを格納
- ファイルが格納されたタイミングで lambda を発火し、アップロードされた動画を HLS に変換する
- 生成されたプレイリストファイルを front に返却する
- shaka player などを用いてプレイヤーを定義し、動画を再生する

みたいな流れでストリーミング用の動画ファイルを生成することができる。

また、上記記したように、MediaRecorder からストリーミング用データを生成する際は、取得したデータを処理して webm や mp4 に変換してから同じプロセスを辿ればいい。

## 所感

動画周りの知見は実務で触れて初めて意識した領域だが、普段見ている動画がどのように処理されているかが少し理解できた気がしており面白い。
実務ベースで覚えていることをまとめてはみたものの、全然覚えていない箇所と理解度が薄い箇所がありそうなので、どこかで小さくプロダクトでも作りながら学びを深めていきたい。
