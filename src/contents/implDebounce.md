---
title: 'GreatFrontend - Debounce'
createdAt: '2024-01-14'
updatedAt: '2024-01-14'
description: 'GreatFrontend - Debounce'
---

## What is Debounce?

> Debouncing is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called

意図的に timer 分、処理の実行を遅らせるテクニック。例えば、検索機能を実装する際で、リアルタイムで打ち込んだ文字列に対して、候補のキーワードが表示される機能を考えた時に、ユーザーが打ち込むたびに API リクエストを投げることは、過剰な API 呼び出しになる。そのため、debounce のテクニックを利用して、ユーザーがタイプをし終わってから xms 後に処理を実行するように実装したりする。

## interface

以下のように実行する。debounce は function と ms を受け取り、ms が経過した後に、function を実行する。ms が経過していないときに debounce が再実行された場合、timer を一度取り消すので、以前の timer で登録していた function は実行されない。

```javascript
let i = 0;
function increment() {
  i++;
}
const debouncedIncrement = debounce(increment, 100);
```

## コード実装

timeout 系の web api を用いて実装する。JavaScript の関数が呼び出されるコンテキストを保持するために、this を一時的に保存していることがポイント。

```javascript
/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
  let timeoutId = null;

  return function (...arg) {
    const context = this;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      timeoutId = null;
      func.apply(context, arg);
    }, wait);
  };
}
```

## References

https://www.greatfrontend.com/questions/javascript/debounce
