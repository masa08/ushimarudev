---
title: 'Leetcode - Smallest Number in Infinite Set'
createdAt: '2023-09-25'
updatedAt: '2023-09-25'
description: 'Leetcode - Smallest Number in Infinite Set'
---

## Smallest Number in Infinite Set

以下の問題を解いていく。配列を用いて解いていく。

https://leetcode.com/problems/smallest-number-in-infinite-set/

## Explanation

現在の値を示す current_integer と addBack で追加された数字を格納する added_integers を定義する。
popSmollest を実行する際に、added_integers が存在する場合はそこから返却し、存在しない場合は、その時点で指し示している値 = current_integer を返却する。

## Code

```
class SmallestInfiniteSet:
    def __init__(self):
        self.added_integers = []
        self.current_integer = 1

    def popSmallest(self) -> int:
        if len(self.added_integers):
            smollest = heapq.heappop(self.added_integers)
        else:
            smollest = self.current_integer
            self.current_integer += 1
        return smollest

    def addBack(self, num: int) -> None:
        if self.current_integer <= num or num in self.added_integers:
            return
        else:
            heapq.heappush(self.added_integers, num)


# Your SmallestInfiniteSet object will be instantiated and called as such:
# obj = SmallestInfiniteSet()
# param_1 = obj.popSmallest()
# obj.addBack(num)
```
