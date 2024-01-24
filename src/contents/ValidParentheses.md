---
title: 'Leetcode - Valid Parentheses'
createdAt: '2023-01-24'
updatedAt: '2023-01-24'
description: 'Leetcode - Valid Parentheses'
---

## Valid Parentheses

We have to check if the symbols appear in a valid order.

https://leetcode.com/problems/delete-node-in-a-bst/

## Explanation

We have to traverse the given symbols, then when we encounter an open bracket, we push it to a stack, and when we encounter a close bracket and a top value in stack is a valid open bracket, we pop the last value from the stack.

Before we traverse the given symbols, we define a map that has a close bracket as a key and an open bracket as a value, and an array named stack that has no elements.

Then we use a for loop to traverse symbols. If the target symbol is in the map keys, it means it is a close bracket, we pop the last element from the stack and check if these are in place by the way that we compare the last elements of stack to mapping index symbol.
if it is true, we pop an element from the stack.

If symbols are in place, the stack will be empty after the process. So we can return the condition that the length of the stack equals 0.

## Code

```
class Solution:
    def isValid(self, symbles: str) -> bool:
        stack = []
        mapping = {")": "(", "]": "[", "}": "{"}

        for s in symbles:
            if s in mapping and stack and stack[-1] == mapping[s]:
                stack.pop()
            else:
                stack.append(s)

        # if array is empty return true
        return len(stack) == 0
```
