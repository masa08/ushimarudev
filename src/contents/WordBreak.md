---
title: 'Leetcode - Word Break'
createdAt: '2023-11-02'
updatedAt: '2023-11-02'
description: 'Leetcode - Word Break'
---

## Word Break

以下の問題を解いていく。動的計画法を用いて回答する。

https://leetcode.com/problems/word-break/

## Explanation

s を iterate して、条件によって dp の値を更新する。
i が word の長さと同等かそれより大きい場合、i の長さが word の長さと等しいか、もしくは i から word の長さを引いた数の dp の値が True かで処理を行う。
かつ対象となっている文字列が word と等しい場合は、wordDict 内の単語が s 内で適切に連結していることを意味しているので、dp[i]
の値を True にする。
この処理がすべてうまくいく場合、dp[-1]が True になる。

## Code

```
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        n = len(s)
        dp = [False] * n
        for i in range(n):
            for word in wordDict:
                if i < len(word)-1:
                    continue

                if i == len(word)-1 or dp[i-len(word)]:
                    if s[i-len(word)+1:i+1] == word:
                        dp[i] = True
                        break
        return dp[-1]
```
