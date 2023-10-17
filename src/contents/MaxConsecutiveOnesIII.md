---
title: 'Leetcode - Max Consecutive Ones III'
createdAt: '2023-10-17'
updatedAt: '2023-10-17'
description: 'Leetcode - Max Consecutive Ones III'
---

## Max Consecutive Ones III

以下の問題を解いていく。sliding window を用いて回答する。

https://leetcode.com/problems/max-consecutive-ones-iii/

## Explanation

right と left を定義して、window の範囲を定義する。window が条件を満たしている場合は、right のみを進めて、window の範囲を広げていく。条件を満たしていない場合は、right を進めるとともに、left も進めて、最大範囲を維持した状態で window を更新する。

## Code

```
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        left = 0
        for right in range(len(nums)):
            if nums[right] == 0:
                k -= 1

            if k < 0:
                if nums[left] == 0:
                    k += 1
                left += 1
        return right - left + 1
```
