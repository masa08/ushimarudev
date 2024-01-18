---
title: 'GreatFrontend - Curry'
createdAt: '2024-01-18'
updatedAt: '2024-01-18'
description: 'GreatFrontend - Curry'
---

## What is Curry?

複数の引数を取る関数を、一つの引数を取る連続した関数に分割するテクニック。実務で触れたことがあるのは、React の HOC を利用した時くらいかも。

> Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

## interface

```javascript
function multiplyThreeNumbers(a, b, c) {
  return a * b * c;
}

const curriedMultiplyThreeNumbers = curry(multiplyThreeNumbers);
curriedMultiplyThreeNumbers(4)(5)(6); // 120

const containsFour = curriedMultiplyThreeNumbers(4);
const containsFourMulFive = containsFour(5);
containsFourMulFive(6); // 120
```

## Codes

```javascript
/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (arg) =>
      arg === undefined
        ? curried.apply(this, [...args])
        : curried.apply(this, [...args, arg]);
  };
}
```

## References

https://www.greatfrontend.com/questions/javascript/curry
