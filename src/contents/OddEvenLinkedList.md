---
title: 'Leetcode - Odd Even Linked List'
createdAt: '2023-09-06'
updatedAt: '2023-09-06'
description: 'Leetcode - Odd Even Linked List'
---

## Odd Even Linked List

以下の問題を解いていく。O(1) Space で問題を解く必要があるので、two pointers を用いてコードを書いていく。

https://leetcode.com/problems/odd-even-linked-list/

## Explanation

最初の node(odd)と二番目の node(even)に対して、pointer を定義する。それぞれ、odd numbers と even numbers のみを link させる linkedlist を生成し、最後に odd に even の list を link させる。

## Code

```
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None: return head

        # get odd nodes and even nodes separately
        odd = head
        evenFirst = even = head.next

        # add even to odd
        while odd and even and odd.next and even.next:
            odd.next = odd.next.next
            odd = odd.next

            even.next = even.next.next
            even = even.next

        odd.next = evenFirst

        # return reorderd list
        return head
```
