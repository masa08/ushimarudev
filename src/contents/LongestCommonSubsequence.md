---
title: 'Leetcode - Longest Common Subsequence'
createdAt: '2023-09-25'
updatedAt: '2023-09-25'
description: 'Leetcode - Longest Common Subsequence'
---

## Longest Common Subsequence

以下の問題を解いていく。DP を用いた回答を行う。

https://leetcode.com/problems/longest-common-subsequence/

## Explanation

掲示された問題を、小さい問題へと分解し、分解されて小さい問題を解いていくことで、掲示された問題への回答を求めていく。

例えば、text1=abcde, text2=ace だった場合、de と e の LCS の解、また bcde と ce の LCS の解などを求めて、dp_grid にその値を記録する。
比較する値が同じ値である場合は、その値を除いた文字列の LCS の解に+1 をして、dp_grid に値を格納する。違う値である場合は、両方の文字を取り除いた場合に考えうる値の最大値を dp_grid に格納する。

その処理を繰り返していくと、最終的に dp_grid[0][0]の値が解答になる。

## Code

```
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp_grid = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]

        for col in reversed(range(len(text2))):
            for row in reversed(range(len(text1))):
                if text2[col] == text1[row]:
                    dp_grid[row][col] = 1 + dp_grid[row + 1][col + 1]
                else:
                    dp_grid[row][col] = max(dp_grid[row + 1][col], dp_grid[row][col + 1])

        return dp_grid[0][0]
```
