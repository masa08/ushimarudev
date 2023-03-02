---
title: 'InterView Preparation - Remove Duplicates from Sorted List'
createdAt: '2023-03-02'
updatedAt: '2023-03-02'
description: 'InterView Preparation - Remove Duplicates from Sorted List'
---

## Motivation

I have commited to solving problems in leetcode for coding interview practice and understanding algorithm and data structure.
Not just solving, but I write docs every time to organize what I think in coding. It leads to my deep understanging I think.

## Maximum Depth of Binary Tree

We want to delete duplicates from the given sorterd list.

Link: https://leetcode.com/problems/remove-duplicates-from-sorted-list/

## Explanation

We check if the given linked list has a duplicate value using two pointers.

At first, if the given head is None, we don’t have to check. So we can return a given head.

Then, we define two variables named prev and current as a pointer, the value of prev is head, and the value of current is prev.next.

We can use a while loop until we reach the end of the linked list.
In each iteration, we check if the value of the node we are looking at is the same as its previous node.

If the value of the current node equals the value of the previous node, it means the value is duplicated, we assign prev.next to current.next and current to current.next. if not, we assign prev to prev.next and current to current.next.

After a while loop, we can return head and in head duplicated values are deleted.

## Code

```
class Solution:
   def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
       if head == None: return head


       prev = head
       current = head.next


       while current:
           if current.val == prev.val:
               prev.next = current.next
               current = current.next
           else:
               prev = prev.next
               current = current.next

       return head

```
