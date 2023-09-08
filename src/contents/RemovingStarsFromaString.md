---
title: 'Leetcode - Removing Stars From a String'
createdAt: '2023-09-04'
updatedAt: '2023-09-04'
description: 'Leetcode - Removing Stars From a String'
---

## Removing Stars From a String

以下の問題を解いていく。stack を用いて、データを保持し、star に遭遇した際は、stack から star の数文字を pop する処理を行う

https://leetcode.com/problems/removing-stars-from-a-string/

## Explanation

stack を定義し、与えられた引数 s を iterate する。char が star だった場合、stack から値を pop し、star の数の文字列を削除する。
最後に join を行い、配列を文字列に変換する。

## Code

```
class Solution:
    def removeStars(self, s: str) -> str:
        # define stack to store result
        stack = []

        # iterate s and push s to stack, when get *, pop val from stack
        for char in s:
            if char == "*":
                stack.pop()
                continue
            stack.append(char)

        return ''.join(stack)
```
