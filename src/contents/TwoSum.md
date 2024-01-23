---
title: 'Leetcode - Two Sum'
createdAt: '2024-01-23'
updatedAt: '2024-01-23'
description: 'Leetcode - Two Sum'
---

## Two Sum

We have to find two pairs in a given array to meet a given target number.

https://leetcode.com/problems/two-sum/

## Explanation

We have to find two numbers that add up to the target number and return these number’s index as a Array.
We can use the dict data structure that stores the each number as a key and the index as a value, then use a for loop to traverse nums and check whether the target number minus the num is in the dict. If it exists, it means there is an answer, so we can return their indexes.

At first, we define the variable named seen to store the each number as a key and the index as a value.
Then we use a for loop to traverse nums array. we can access index and num in every loop.
In the loop, we define the variable named remain that means the result of target minus num. And we check if the remain is in the seen. If true, we can return the array that has seen index remain and index. If not, we store the index in the seen index num.

## Code

```python
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # for i in range(len(nums)):
        #     for j in range(i+1, len(nums)):
        #         if nums[j] == target - nums[i]:
        #             return [i,j]
        seen = {}
        for index, num in enumerate(nums):
            remain = target - num
            if remain in seen:
                return [seen[remain], index]
            seen[num] = index
```
