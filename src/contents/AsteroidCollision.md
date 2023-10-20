---
title: 'Leetcode - Asteroid Collision'
createdAt: '2023-10-20'
updatedAt: '2023-10-20'
description: 'Leetcode - Asteroid Collision'
---

## Asteroid Collision

以下の問題を解いていく。stack を用いて回答する。

https://leetcode.com/problems/asteroid-collision

## Explanation

Collision が起こる場合を考えると、s[-1] > 0 でありかつ、次に検討する asteroid < 0 である場合のみ、Collision が発生する。また、Collision が発生した場合、stack 内の全ての要素と、ターゲットの asteroid が Collision するかどうかを検討する必要があり、つまり recursive or iterative に対応する必要がある。

また、消滅する asteroid について、st[-1]と asteroid の比較で、それぞれの場合で対応方法が違うので、if 文で処理を記述する。

## Code

```
class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        # initialize stack
        st = []

        # itelate asteroids
        for asteroid in asteroids:
            while st and st[-1] > 0 and asteroid < 0:
                if st[-1] + asteroid < 0:
                    st.pop()
                elif st[-1] + asteroid > 0:
                    break
                else:
                    st.pop()
                    break
            else:
                st.append(asteroid)


        return st
```
