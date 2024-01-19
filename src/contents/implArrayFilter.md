---
title: 'GreatFrontend - Array.prototype.filter'
createdAt: '2023-02-22'
updatedAt: '2023-02-22'
description: 'GreatFrontend - Array.prototype.filter'
---

## What is Array.prototype.filter?

配列に対して、引数で渡した callbackFunc を実行し、条件に当てはまる要素のみを抽出した配列を返すメソッド。MDN の説明は以下。

> filter() は、与えられた callbackFn 関数を配列の各要素に対して一度ずつ呼び出し、callbackFn が true に評価される値を返したすべての要素からなる新しい配列を生成します。 callbackFn は値が代入されている配列の添字に対してのみ呼び出されます。つまり、すでに削除された添字や、まだ値が代入されていない添字に対しては呼び出されません。callbackFn によるテストに合格しなかった配列要素は単純にスキップされ、新しい配列には含まれないだけです。

## interface

MDN のサイトから例を抜粋。input に関しては、callbackFn と thisArg を指定することができる。thisArg は callbackFn を実行するときに this として使用される。

```javascript
const words = [
  'spray',
  'limit',
  'elite',
  'exuberant',
  'destruction',
  'present',
];
const result = words.filter((word) => word.length > 6);
// Expected output: Array ["exuberant", "destruction", "present"]
```

## Codes

```javascript
/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const len = this.length;
  const result = [];

  for (let i = 0; i < len; i++) {
    if (Object.hasOwn(this, i) && callbackFn.call(thisArg, this[i], i this)) {
      result.push(this[i])
    }
  }

  return result;
};
```

留意点としては以下。

> The thisArg doesn't do anything if the callback is defined as an arrow function as arrow functions don't have their own bindings to this.

## Referenes

https://www.greatfrontend.com/questions/javascript/array-filter
