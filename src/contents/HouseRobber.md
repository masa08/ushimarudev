---
title: 'Leetcode - House Robber'
createdAt: '2023-11-01'
updatedAt: '2023-11-01'
description: 'Leetcode - House Robber'
---

## House Robber

以下の問題を解いていく。動的計画法を用いて回答する。

https://leetcode.com/problems/house-robber

## Explanation

i の値 + 隣接した値以外を最大値を足して、dp[i]の値を求める。i=0 からその処理を繰り返していくと、最終的に dp[-1]には求めている答えが格納されている。

## Code

```
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)

        if n < 3:
            return max(nums)

        dp = [0] * n
        dp[0] = nums[0]
        dp[1] = nums[1]

        for i in range(2, n):
            val = max(dp[:i-1])
            dp[i] = nums[i] + val

        return max(dp)
```
