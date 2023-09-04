---
title: 'Leetcode - Delete the Middle Node of a Linked List'
createdAt: '2023-09-04'
updatedAt: '2023-09-04'
description: 'Leetcode - Delete the Middle Node of a Linked List'
---

## Delete the Middle Node of a Linked List

以下の問題を解いていく。中間の index の node を削除したいので、それを取得した後に、linkedlist から対象の node を削除する処理を書いていく

https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/

## Explanation

dummy を定義し、そちらを参照しつつ、linkedlist 全体の長さを取得する。取得したのち、長さを 2 でわり、かつ math.floor で四捨五入をして切り捨てを行う。

対象の node の index が取得できたので、削除対応を行う。この際、prev と curr を定義し、一つ前の node と現在の node を保持し続ける。対象の index に差し掛かった場合に、対象の node を link から外す処理を行う。

## Code

```
import math

class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # find target index
        dummy = head
        count = 0
        while dummy != None:
            dummy = dummy.next
            count += 1

        if count == 1:
            return None

        delete_index = math.floor(count / 2)

        # delete index node
        prev = curr = head
        index = 0

        while curr != None:
            if index == delete_index:
                prev.next = curr.next
                curr = prev.next
                break
            prev = curr
            curr = curr.next
            index += 1

        # return head
        return head
```
