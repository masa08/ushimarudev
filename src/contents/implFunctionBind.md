---
title: 'GreatFrontend - Function.prototype.bind'
createdAt: '2023-02-27'
updatedAt: '2023-02-27'
description: 'GreatFrontend - Function.prototype.bind'
---

## What is Function.prototype.bind?

関数を呼び出す際に、その関数が依存する実行のコンテキストを指定し、引数の一部を保持するための関数。MDN の説明は以下。

> bind() 関数は新しい「バインド済み関数 (bound function)」を生成します。バインド済み関数を呼び出すと、通常はラップされた関数のほうが実行され、それは「ターゲット関数 (target function)」とも呼ばれます。バインド済み関数は、渡された引数、すなわち this の値と最初のいくつかの引数を内部の状態として格納します。これらの値は、呼び出し時に渡されるのではなく、あらかじめ格納されています。一般に、const boundFn = fn.bind(thisArg, arg1, arg2) は、const boundFn = (...restArgs) => fn.call(thisArg, arg1, arg2, ...restArgs) と呼ばれるのと同じだと考えてよいでしょう（ただし boundFn が構築されたときではなく、呼び出されたときに効果があります）。

React で class コンポーネントを使っていた時代に、関数をコンポーネントインスタンスに bind する場合に、よく利用していた。

ref: https://ja.reactjs.org/docs/faq-functions.html

## interface

MDN のサイトから例を抜粋。第一引数の thisArg に bind したいコンテキストを指定。

```javascript
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
```

## Codes

```javascript
/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
  const originalFunc = this;

  return function (...argArray2) {
    return originalFunc.call(thisArg, ...argArray, ...argArray2);
  };
};
```

## References

https://www.greatfrontend.com/questions/javascript/function-bind

https://www.estie.jp/blog/entry/javascript-bind-this

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_objects/Function/bind
