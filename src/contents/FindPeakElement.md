---
title: 'Leetcode - Find Peak Element'
createdAt: '2023-09-15'
updatedAt: '2023-09-15'
description: 'Leetcode - Find Peak Element'
---

## Find Peak Element

以下の問題を解いていく。O(log N)で回答する必要があるので、Binary Search を用いて解く。

https://leetcode.com/problems/find-peak-element/

## Explanation

配列の数字をグラフ上に配置した時に、最大値となっている数字 = Peak Element を特定する。
binary search なので、初期値として、left と right を定義して、今回は iterative な形で、white 文を使って処理を回していく。
nums[pivot]の値が右隣の値より大きいか否かを基準に、left と right を更新していく。このような処理を継続した場合、left と right は一致し、ピーク要素を指し示すので、いずれかを返却する。

## Code

```
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        # O(log n)
        left, right = 0, len(nums)-1

        while left < right:
            pivot = (left + right) // 2
            if nums[pivot] > nums[pivot+1]:
                right = pivot
            else:
                left = pivot+1

        return left

        # O(n)
        # peak_elem = 0
        # for index, num in enumerate(nums):
        #     if num > nums[peak_elem]:
        #         peak_elem = index

        # return peak_elem
```
