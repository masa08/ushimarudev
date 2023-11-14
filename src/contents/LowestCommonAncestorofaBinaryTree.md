---
title: 'Leetcode - Lowest Common Ancestor of a Binary Tree'
createdAt: '2023-11-14'
updatedAt: '2023-11-14'
description: 'Leetcode - Lowest Common Ancestor of a Binary Tree'
---

## Lowest Common Ancestor of a Binary Tree

以下の問題を解いていく。DFS を用いて解答する。

https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

## Explanation

p と q には 3 通りの存在の仕方がある。すなわち、root から見て「p,q がともに左側のツリーに存在する」、「p,q がともに右側のツリーに存在する」、「p,q が左と右のツリーに別々で存在する」パターンである。
一つ目の二つ目のパターンの場合、先に iterate された node の値が LCA となるので、その値を返却する。3 つ目のパターンの場合、root が LCM となるので、その値を返却する。

## Code

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root: return None
        if root == q or root == p: return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if not left: return right
        if not right: return left

        return root
```
