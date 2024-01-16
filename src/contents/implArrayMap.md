---
title: 'GreatFrontend - Array.prototype.map'
createdAt: '2023-02-21'
updatedAt: '2023-02-21'
description: 'GreatFrontend - Array.prototype.map'
---

## Array.prototype.map とは

配列に対して、引数で渡した callback を各要素を引数にして実行し、そこ結果を格納した新しい配列を返すメソッド。MDN の説明は以下。

> map は、与えられた callbackFn 関数を配列の順番通りに、各要素に対して一度ずつ呼び出し、その結果から新しい配列を生成します。 callbackFn は、値が代入されている配列の要素に対してのみ呼び出されます (undefined が代入されているものも含みます)。

実務でも結構な頻度で使うメソッド。また、MDN では以下の場合、非推薦との記載あり。

> map は新しい配列を作成するので、返された配列を使わない場合、map を使うのはパターンに合いません。代わりに forEach または for...of を使用してください。

## interface

引数として、callbackFn と thisArg を指定することができる。thisArg は callbackFn を実行するときの this として使用される。

```javascript
const numbers = [1, 4, 9];
const roots = numbers.map((num) => Math.sqrt(num));
// roots: [1, 2, 3]
// numbers: [1, 4, 9]
```

## コード実装

配列の各要素に対して、callBackFn を実行し、返却値を新しい配列に挿入する。

```javascript
/**
 * @callback callbackFn
 * @param {object} [thisArg]
 * @return {Array}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  const length = this.length;
  const arr = new Array(length);

  for (let i = 0; i < length; i++) {
    // To avoid sparse
    if (Object.hasOwn(this, i)) {
      arr[i] = callbackFn.call(thisArg, this[i], i, this);
    }
  }
  return arr;
};
```

Object.hasOwn についての説明は以下。

> 配列のインデックスが存在するかどうかを調べる。Array の要素は直接のプロパティとして定義されているので、hasOwn() メソッドで特定のインデックスが存在するかどうかを調べることができます。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn

例えば、元の配列が[1,2,,4]とかの場合に、callback の実行を無視するための判定として、使用している。

Function.prototype.call についての説明は以下。

> call() はあるオブジェクトに所属する関数やメソッドを、別なオブジェクトに割り当てて呼び出すことができます。

以下の部分で引数に渡しているものは、thisArg が実行時に this として扱われる値、それ以外は map の interface で必要な値。

> callbackFn.call(thisArg, this[k], k, this)

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call

## 参考

https://www.greatfrontend.com/questions/javascript/array-map
