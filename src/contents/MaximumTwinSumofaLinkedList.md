---
title: 'Leetcode - Maximum Twin Sum of a Linked List'
createdAt: '2023-10-05'
updatedAt: '2023-10-05'
description: 'Leetcode - Maximum Twin Sum of a Linked List'
---

## Maximum Twin Sum of a Linked List

以下の問題を解いていく。stack を用いて回答する。

https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list

## Explanation

linkedlist の長さと各値を取得したいので、配列を定義して、initialize する処理を書く。twin のロジックを追っていくと、linkedlist の中央を起点として、ListNode の twin のペアが決まっていることがわかる。
例えば、長さが 4 の linkedlist の場合、index=0 の twin は index=3 の listnode で、index=1 の twin は index=2 の twin である。
つまり、linkedlist の半分までを精査して、対応する twin の値を足し合わせた数の最大値を求めれば良い。

## Code

```
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # initialize stack
        curr = head
        stack = []

        while curr:
            stack.append(curr.val)
            curr = curr.next

        # iterate ll
        size = len(stack)
        count = 1
        maximum = 0
        while count <= size/2:
            maximum = max(maximum, head.val + stack.pop())
            head = head.next
            count += 1

        return maximum
```
