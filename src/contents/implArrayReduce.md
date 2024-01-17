---
title: 'GreatFrontend - Array.prototype.reduce'
createdAt: '2023-02-24'
updatedAt: '2023-02-24'
description: 'GreatFrontend - Array.prototype.reduce'
---

## What is Array.prototype.reduce?

配列に対して、引数で渡した callback を各要素に対して実行し、合計の計算結果を返却する。MDN の解説は以下。

> reduce() メソッドは 2 つの引数をとります。コールバック関数と、オプションで初期値を指定することができます。 初期値が指定された場合、 reduce() は配列のそれぞれの要素に対して順に「縮小」コールバック関数を呼び出します。初期値が指定されなかった場合、 reduce() は配列の最初の要素の後にあるそれぞれの要素に対してコールバック関数を呼び出します。

実務では、BFF Server でマイクロサービスからの Response をオブジェクトに集約する際に使用したことがある。MDN にも注意書きとして書いているが、コードの可読性が結構下がるので、注意して使う。

> reduce() のような再帰的な関数は強力ですが、特に経験の浅い JavaScript 開発者にとっては理解するのが難しい場合があります。他の配列メソッドを使用した場合にコードが明確になるなら、開発者は reduce() を使用する他の利点と可読性をトレードオフで比較検討する必要があります。 reduce() が最適な選択である場合は、文書化と意味的な変数名を使用することが可読性の欠点を軽減するのに役立ちます。

参考: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

## interface

input に関しては、callbackFn と initialValue を指定することができる。MDN より例を抜粋。配列の総和を求める計算などを例に取るとわかりやすい。

```javascript
// 例1
const array1 = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = array1.reduce((prev, curr) => prev + curr, initialValue);

console.log(sumWithInitial); // Expected output: 10

// 例2
const products = [
  { category: 'fruits', name: 'apple', quantity: 5 },
  { category: 'vegetables', name: 'carrot', quantity: 4 },
  { category: 'fruits', name: 'banana', quantity: 7 },
];

const quantityByCategory = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + product.quantity;
  return acc;
}, {});

console.log(quantityByCategory); // 出力: { fruits: 12, vegetables: 4 }
```

## Codes

```javascript
/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const isInitialValueEmpty = initialValue === undefined;
  const len = this.length;
  if (isInitialValueEmpty && len === 0) {
    throw TypeError('Reduce of empty array with no initial value');
  }

  let accumulater = isInitialValueEmpty ? this[0] : initialValue;
  const firstidx = isInitialValueEmpty ? 1 : 0;

  for (let k = firstidx; k < len; k++) {
    // To avoid sparse
    if (Object.hasOwn(this, k)) {
      accumulater = callbackFn(accumulater, this[k], k, this);
    }
  }
  return accumulater;
};
```

## References

https://www.greatfrontend.com/questions/javascript/array-reduce
