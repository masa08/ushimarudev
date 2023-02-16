---
title: 'Promise.all を実装してみる'
createdAt: '2023-02-16'
updatedAt: '2023-02-16'
description: 'Promise.allを実装した際のメモ'
---

## モチベーション

年始あたりから GreatFrontEnd の問題を解き始めている。

https://www.greatfrontend.com/

理由としては、

- 将来クライアント側の SWE としてコーディング試験を受ける際の練習になるから
- 楽しいから

である。
JavaScript や TypeScript で機能を実装することは多いが、普段使っているメソッドや function が内部でどのような動きをしているのかを、車輪の再発明をする過程で理解していくのはとても楽しい。

## Promise.all とは

> このメソッドは複数のプロミスの結果を集約するのに便利です。このメソッドは、コード全体が正常に動作するために依存している複数の関連する非同期タスクがあり、コードの実行を続ける前にそれらすべてを履行させたい場合によく使われます。

互いに独立した非同期処理を実行する場合、Promise.all を利用すると並列実行されるので、全体処理が完了するまでの時間が短くなる。

> Promise.all() メソッドは、プロミスの並列処理メソッドのうちの一つです。このメソッドは、複数のプロミスの結果を集約するのに便利です。

実務だと、nextjs で SSR していた時に、必要なデータを複数 api から取得する時とかに使ったことがある。あとは副業で動画アップロード機能を実装していた際に、複数ビデオを一括アップロードする時とかに使用した。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

## interface

インプットについては待機状態の promise の配列、例えば以下のような感じ。

```javascript
const promise1 = fetch1();
const promise2 = fetch2();
const promises = [promise1, promise2];
```

返り値について、実行された非同期処理の結果を配列に格納した形で返却される

```javascript
const promise1 = fetch1();
const promise2 = fetch2();
const promises = [promise1, promise2];

const res = await Promise.all(promises);
res = [promise1の返り値, promise2の返り値];
```

## コード実装

配列の中身を一つずつ取り出し、全部の処理が終了したら resolve、何か一つでも失敗したら reject をする関数を記述する。

```javascript
function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    const results = new Array(arr.length);
    let unresolved = arr.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    arr.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unresolved -= 1;

        if (unresolved === 0) resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  });
}
```
