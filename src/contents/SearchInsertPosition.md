---
title: 'Leetcode - Search Insert Position'
createdAt: '2024-01-25'
updatedAt: '2024-01-25'
description: 'Leetcode - Search Insert Position'
---

## Search Insert Position

In this question, we have to find the position to insert the target number in the given array.

https://leetcode.com/problems/two-sum/

## Explanation

The given array is sorted, so we can use a binary search approach.

We can use 2 pointers to keep track of the search range and use the value at the middle to determine which direction to shift and narrow down the search range, and repeat it until we identify the target position

At first, we assign a variable named left to 0 and a variable named right to len(array)-1

Then, we use a while loop which ends when left is higher than right.
In a while loop, we define a variable named mid, it is the value at the middle of left and right.

And then, we can check the relation between the mid number and the target number.
We can consider three patterns.

1. First, if the target value is equal to the mid number, the job is done. it is the suitable position to insert.
2. Second, if the target value is greater than the mid value, continue to search the right area.
3. Third, if the target value is less than the mid value, continue to search the left area.

If we encounter a second case or a third case, we can continue a while loop.

If the target value is not found after a while loop, we can return left because the loop will be stopped when left is greater than right and the target is greater than nums index right and lower than nums index left.

## Code

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        # brute force
        # if target <= nums[0]:
        #     return 0

        # for i in range(1, len(nums)):
        #     if nums[i-1] < target and target <= nums[i]:
        #         return i
        # return len(nums)

        # two pointers
        left, right = 0, len(nums)-1

        while left <= right:
            pivod =(left+right)//2

            if nums[pivod] == target:
                return pivod
            elif nums[pivod] < target:
                left = pivod+1
            else:
                right = pivod-1
        return left
```
