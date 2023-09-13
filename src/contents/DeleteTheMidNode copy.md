---
title: 'Leetcode - Delete Node in a BST'
createdAt: '2023-09-13'
updatedAt: '2023-09-13'
description: 'Leetcode - Delete Node in a BST'
---

## Delete Node in a BST

以下の問題を解いていく。対象の Node を BST から削除する。再起を用いて BST を iterate し、対象の Node に当たったタイミングで、整合性を保ちながら BST を変更する。

https://leetcode.com/problems/delete-node-in-a-bst/

## Explanation

successor = そのノードの右部分木の中で最もキーが小さいノードで、predecessor=そのノードの左部分木の中で最もキーが大きいノードである。
Node 削除の処理をする際、左部分木と右部分木の存在に応じて、Node の値を差し替える。その際、key を root.val に指定した上で再帰関数を実行することで、値の書き換え元となった Node に関しても適切な処理を実施することができる。

## Code

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root: return None

        if key > root.val:
            root.right = self.deleteNode(root.right, key)
        elif key < root.val:
            root.left = self.deleteNode(root.left, key)
        else:
            if not root.left and not root.right:
                root = None
            elif root.right:
                root.val = self.successor(root)
                root.right = self.deleteNode(root.right, root.val)
            else:
                root.val = self.predecessor(root)
                root.left = self.deleteNode(root.left, root.val)

        return root

    def successor(self, root: TreeNode) -> TreeNode:
        root = root.right
        while root.left:
            root = root.left
        return root.val

    def predecessor(self, root: TreeNode) -> TreeNode:
        root = root.left
        while root.right:
            root = root.right
        return root.val
```
