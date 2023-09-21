---
title: 'Leetcode - Keys and Rooms'
createdAt: '2023-09-21'
updatedAt: '2023-09-21'
description: 'Leetcode - Keys and Rooms'
---

## Keys and Rooms

以下の問題を解いていく。DFS を利用して、各部屋から行くことができる部屋を調査し、すべての部屋に行くことができるかどうかをチェックする。

https://leetcode.com/problems/keys-and-rooms/

## Explanation

visited を定義して、初期値をすべて False に設定する。visited[0]は最初の部屋を表現し、その値によって、訪問したかどうかを判断する。
rooms の各要素には key の配列が含まれており、key が存在していれば、その数字が指し示す部屋に行くことができる。すなわち、visdited[key]が True になる。よって、最初の状態から行くことができる 0 番目の部屋から順に確認して行き、visited を更新した後、すべての部屋に行くことができたかを確認する。

## Code

```
class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        visited = [False] * len(rooms)

        # check visited room
        def checkCanVisitRooms(room_index: int):
            if visited[room_index] == True: return

            visited[room_index] = True
            for key in rooms[room_index]:
                checkCanVisitRooms(key)

        checkCanVisitRooms(0)

        # return true if all values are true in visited else false
        return all(visited)
```
