---
title: 'Leetcode - Maximum Number of Vowels in a Substring of Given Length'
createdAt: '2023-09-19'
updatedAt: '2023-09-19'
description: 'Leetcode - Maximum Number of Vowels in a Substring of Given Length'
---

## Maximum Number of Vowels in a Substring of Given Length

以下の問題を解いていく。文字列の特定の範囲を精査していき、回答を求める問題なので、Sliding Window を利用して方針を立てる。

https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/

## Explanation

文字列 s を k 範囲で見たときに、母音がいくつ含まれているかを計算し、その最大値を求める問題。k の範囲を順番に見ていき、count を更新することで答えを求める。
最初の範囲に関しては事前に計算して、その後で、それ以降の範囲についても見ていく。ポイントとして、Sliding させる際に、「範囲から外れる値」と「新しく範囲に入る値」をチェックして、条件に該当するかを確認し、答えを更新していく。

## Code

```
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = {'a','e','i','o','u'}

        # calculate initial count in first range
        count = 0
        for i in range(k):
            count += int(s[i] in vowels)
        answer = count

        # sliding window
        for i in range(k, len(s)):
            count += int(s[i] in vowels)
            count -= int(s[i-k] in vowels)
            answer = max(answer, count)

        return answer

```
