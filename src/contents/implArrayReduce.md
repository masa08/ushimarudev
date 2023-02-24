---
title: 'Array.prototype.reduce を実装してみる'
createdAt: '2023-02-24'
updatedAt: '2023-02-24'
description: 'Array.prototype.reduceを実装した際のメモ'
---

## Array.prototype.reduce とは

配列に対して、引数で渡した callback を各要素に適用し、その際に。第二引数で指定した deafault の値を callback の引数として使用することができる。MDN の解説は以下。

> reduce() メソッドは 2 つの引数をとります。コールバック関数と、オプションで初期値を指定することができます。 初期値が指定された場合、 reduce() は配列のそれぞれの要素に対して順に「縮小」コールバック関数を呼び出します。初期値が指定されなかった場合、 reduce() は配列の最初の要素の後にあるそれぞれの要素に対してコールバック関数を呼び出します。

自分の経験だと、BFF でマイクロサービスからのレスポンスを集約する際に使用したことがある。MDN にも注意書きとして書いているが、コードの可読性が結構下がるので、その辺はデメリット。

> reduce() のような再帰的な関数は強力ですが、特に経験の浅い JavaScript 開発者にとっては理解するのが難しい場合があります。他の配列メソッドを使用した場合にコードが明確になるなら、開発者は reduce() を使用する他の利点と可読性をトレードオフで比較検討する必要があります。 reduce() が最適な選択である場合は、文書化と意味的な変数名を使用することが可読性の欠点を軽減するのに役立ちます。

参考: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

## interface

input に関しては、callbackFn と 初期値 を指定することができる。MDN より例を抜粋。配列の総和を求める計算などを例に取るとわかりやすい。

```javascript
const array1 = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = array1.reduce((prev, curr) => prev + curr, initialValue);

console.log(sumWithInitial); // Expected output: 10
```

## コード実装

配列の各要素に対して、callBackFn を実行し、返却値を新しい配列に挿入する。

```javascript
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const isInitialValEmpty = initialValue === undefined;
  const len = this.length;
  // [].reduce(() => {})　を実行すると、以下のエラーが発生する
  // Uncaught TypeError: Reduce of empty array with no initial value
  if (isInitialValEmpty && len === 0)
    throw new TypeError('Reduce of empty array with no initial value');

  let acc = isInitialValEmpty ? this[0] : initialValue;
  let startingIndex = isInitialValEmpty ? 1 : 0;

  for (let k = startingIndex; k < len; k++) {
    // 要素が指定されている場合のみ実行
    if (Object.hasOwn(this, k)) {
      acc = callbackFn(acc, this[k], k, this);
    }
  }

  return acc;
};
```

## 参考

https://www.greatfrontend.com/questions/javascript/array-reduce
