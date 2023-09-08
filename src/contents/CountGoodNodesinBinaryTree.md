---
title: 'Leetcode - Count Good Nodes in Binary Tree'
createdAt: '2023-09-04'
updatedAt: '2023-09-04'
description: 'Leetcode - Count Good Nodes in Binary Tree'
---

## Count Good Nodes in Binary Tree

以下の問題を解いていく。BT の探索なので、BFS or DFS のアプローチが考えられる。今回はどちらでも実装できそうなので、DFS のアプローチで問題を解く。

https://leetcode.com/problems/count-good-nodes-in-binary-tree/

## Explanation

DFS を行うために、再帰関数を定義する。再帰にはベースケースが必要となるので、root が None の場合は count を return するようにする。root node から始まり、左右の node で対象を満たす node が存在するか探索する。
最終的に合計の count を return する。

## Code

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        # nodeの最大値を保持しつつ、DFSを行う関数を定義し、条件に合う場合、countを+1する

        def _goodNodes(self, root: TreeNode, count: int, maxval: int) -> int:
            if root is None: return count

            if root.val >= maxval:
                count += 1
                maxval = root.val

            if root.left:
                count += _goodNodes(self, root.left, 0, maxval)
            if root.right:
                count += _goodNodes(self, root.right, 0, maxval)

            return count

        res = _goodNodes(self, root, 0, -float('inf'))
        return res
```
