---
title: 'Array.prototype.map を実装してみる'
createdAt: '2023-02-21'
updatedAt: '2023-02-21'
description: 'Array.prototype.mapを実装した際のメモ'
---

## Array.map とは

配列に対して、引数で渡した callback を各要素に適用し、新しい配列を返すメソッド。MDN の説明は以下。

> map は、与えられた callbackFn 関数を配列の順番通りに、各要素に対して一度ずつ呼び出し、その結果から新しい配列を生成します。 callbackFn は、値が代入されている配列の要素に対してのみ呼び出されます (undefined が代入されているものも含みます)。

実務でも結構な頻度で使うメソッド。
また、MDN では以下の場合、非推薦との記載あり。直近だと for of の方がよく使っている印象。

> map は新しい配列を作成するので、返された配列を使わない場合、map を使うのはパターンに合いません。代わりに forEach または for...of を使用してください。

## interface

input に関しては、callbackFn と thisArg を指定することができる。thisArg は callbackFn を実行するときに this として使用される。

```javascript
const numbers = [1, 4, 9];
const roots = numbers.map((num) => Math.sqrt(num));
// roots: [1, 2, 3]
// numbers: [1, 4, 9]
// 新しい配列を作成するので、元の配列はそのまま
```

## コード実装

配列の各要素に対して、callBackFn を実行し、返却値を新しい配列に挿入する。

```javascript
Array.prototype.myMap = function (callbackFn, thisArg) {
  const len = this.length;
  const array = new Array(len);

  for (let k = 0; k < len; k++) {
    if (Object.hasOwn(this, k)) {
      array[k] = callbackFn.call(thisArg, this[k], k, this);
    }
  }
  return array;
};
```

Object.hasOwn というメソッドを初めて知ったが、以下の用途で使われているみたい。

> 配列のインデックスが存在するかどうかを調べる。Array の要素は直接のプロパティとして定義されているので、hasOwn() メソッドで特定のインデックスが存在するかどうかを調べることができます。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn#%E9%85%8D%E5%88%97%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%8C%E5%AD%98%E5%9C%A8%E3%81%99%E3%82%8B%E3%81%8B%E3%81%A9%E3%81%86%E3%81%8B%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B

例えば、元の配列が[1,2,,4]とかの場合に、callback の実行を無視するための判定として、使用している。

また Function.prototype.call に関しても普段あまり見かけないメソッド。

> call() はあるオブジェクトに所属する関数やメソッドを、別なオブジェクトに割り当てて呼び出すことができます。

以下の部分で引数に渡しているものは、thisArg が実行時に this として扱われる値、それ以外は map の interface で必要な値。

> callbackFn.call(thisArg, this[k], k, this);

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call
