---
title: 'Leetcode - Subarray Sum Equals K'
createdAt: '2023-11-02'
updatedAt: '2023-11-02'
description: 'Leetcode - Subarray Sum Equals K'
---

## Subarray Sum Equals K

以下の問題を解いていく。

https://leetcode.com/problems/word-break/

## Explanation

num を iterate する過程で累積和を保持しつつ、dict に各累積和の出現回数を保持していく。
まず、累積和が与えられた k と等しい場合は、count を加算する。
また、累積和から、k を引いた数が、過去に累積輪として出現していた場合。過去のその時点から最新の累積和の時点までで、k を満たす部分配列が存在していたことを意味する。
ので、その場合も count を加算する。

## Code

```
class Solution:
    def subarraySum(self, nums, k):
        count = current_sum = 0
        h = defaultdict(int)

        for num in nums:
            current_sum += num

            # 最初からnumまでの合計和がkの場合
            if current_sum == k:
                count += 1

            # 部分配列の和がkの場合
            count += h[current_sum-k]

            # すでに出現したcurrent_sumの回数をカウント
            h[current_sum] += 1

        return count
```
