---
title: 'InterView Preparation - Maximum Depth of Binary Tree'
createdAt: '2023-02-22'
updatedAt: '2023-02-22'
description: 'InterView Preparation - Maximum Depth of Binary Tree'
---

## Motivation

I have commited to solving problems in leetcode for coding interview practice and understanding algorithm and data structure.
Not just solving, but I write docs every time to organize what I think in coding. It leads to my deep understanging I think.

## Maximum Depth of Binary Tree

We want to know the depth of the Binary Tree.

Link: https://leetcode.com/problems/maximum-depth-of-binary-tree/

## Explanation

### DFS

We can use a DFS way to get the answer.
We use a recursive approach to calculate. The base case is then the root is None.

We calculate the maximum depth of the left and the right subtrees and return that maximum value plus one.
The value represents the depth of the target tree.

## BFS way

We want to know the depth of the Binary Tree. We can use a BFS way to get the answer.
We use an array to store root information. And then traverse the array until it is empty using a while loop.

First, We add the root to an array, then we use a while loop that is stopped if the array is empty.
In a while loop, we pop the value from the array, and confirm if it has left or right. If it has, we add the treenode to the array.
Lastly, we add one value to the depth.

After finishing traversing, we can get the depth.

## Code

```
class Solution:
   def maxDepth(self, root: Optional[TreeNode]) -> int:
       # DFS
       if not root: return 0
       return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))

       # BFS
       # if not root: return 0
       # queue = [root]
       # depth = 0


       # while queue:
       #     for _ in range(len(queue)):
       #         q = queue.pop(0)
       #         if q and q.left: queue.append(q.left)
       #         if q and q.right: queue.append(q.right)
       #     depth += 1

       # return depth
```
