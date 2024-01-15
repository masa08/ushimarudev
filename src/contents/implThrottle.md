---
title: 'GreatFrontend - Throttle'
createdAt: '2024-01-15'
updatedAt: '2024-01-15'
description: 'GreatFrontend - Throttle'
---

## What is Throttle?

> Throttling is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is said to be throttled with a wait time of X milliseconds, it can only be invoked at most once every X milliseconds. The callback is invoked immediately and cannot be invoked again for the rest of the wait duration.

指定した秒数の間に、func が一回しか実行されないことを保証する。debounce が最後のアクションから指定時間経過後に func を実行するのに対して、throttle では最初に func を実行してから、指定時間が経過した時点で、func を実行する。それにより、指定された時間の間、func が重複されて実行されることを防ぐ。
例えば、スクロールイベントを検知して無限スクロールを実現したい場合などに利用する。

## interface

debounce と同じく、func と ms を受け取る。

```javascript
let i = 0;
function increment() {
  i++;
}
const throttledIncrement = throttle(increment, 100);
```

## Codes

shouldThrottle の bool の値に応じて、func の実行をコントロールする。

```javascript
/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait = 0) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) return;
    shouldThrottle = true;
    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}
```

## References

https://www.greatfrontend.com/questions/javascript/throttle
