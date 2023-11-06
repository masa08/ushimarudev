---
title: 'Leetcode - Best Time to Buy and Sell Stock with Transaction Fee'
createdAt: '2023-11-06'
updatedAt: '2023-11-06'
description: 'Leetcode - Best Time to Buy and Sell Stock with Transaction Fee'
---

## Best Time to Buy and Sell Stock with Transaction Fee

以下の問題を解いていく。dp を用いて回答する。

https://leetcode.com/problems/asteroid-collision

## Explanation

各日に行うアクションとして「何もしない」、「株を買う」、「株を売る」の 三通りのアクションが考えられる。
これらすべての行動とその結果保持される状態を考慮する場合、一つの dp では管理がしきれない。そのため、hold(=株を買った場合の状態)と free(=株を売った場合の状態)の二つの状態を定義して、それぞれの場合における最大値を保持する dp を定義する。
hold では、「何もしない」場合と「前日に株を買っていなくて、株を新規に購入する場合」で比較した時に値が大きい方を、free では、「何もしない」場合と「前日に株を保持していて、株を当日に売却する場合」で比較した時に値が大きい方を保持する。最終的に、free[-1]を返却することで、最終日における最大の利益を求めることができる。

## Code

```
class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        n = len(prices)
        # dpの定義
        hold, free = [0]*n,[0]*n
        # 初期値の定義
        hold[0] -= prices[0]

        # 各日で最大値を保持
        for i in range(1,n):
            hold[i] = max(hold[i-1], free[i-1] - prices[i])
            free[i] = max(free[i-1], hold[i-1] + prices[i] - fee)

        return free[-1]
```
