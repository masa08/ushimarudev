---
title: 'FlutterのProviderを理解する'
createdAt: '2023-07-06'
updatedAt: '2023-07-06'
description: 'FlutterのProviderを理解する'
---

## Motivation

前回の記事で Inherited Widget について考察をしたので、今回は Provider について考察したいと思います。

## What is Provider

Provider の公式ページには以下のような説明があります。

> A wrapper around InheritedWidget to make them easier to use and more reusable.

従来 InheritedWidget で行っていた、O(1)での状態へのアクセス、またそれらが変更された際に、状態を参照している機能をリビルドする機能を、Provider を通じて利用することができます。

公式サイトには利点として、以下のような点が挙げられています(下記ページより引用)

- simplified allocation/disposal of resources
- lazy-loading
- a vastly reduced boilerplate over making a new class every time
- devtool friendly – using Provider, the state of your application will be visible in the Flutter devtool
- a common way to consume these InheritedWidgets (See Provider.of/Consumer/Selector)
- increased scalability for classes with a listening mechanism that grows exponentially in - complexity (such as ChangeNotifier, which is O(N) for dispatching notifications).

加えて、Provider は状態管理の機能も備えているので、従来 StatefullWidget で行っていた状態管理の代わりに利用することも可能です。

参照: https://pub.dev/packages/provider

## Usage of Provider

以下のように利用します。

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: const MyApp(),
    ),
  );
}

class Counter extends ChangeNotifier {
  int count = 0;

  void increment() {
    count++;
    notifyListeners();
  }

  void decrement() {
    count--;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: MyHomePage());
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(context.watch<Counter>().count.toString()),
            ElevatedButton(
              onPressed: () => context.read<Counter>().increment(),
              child: const Text("increment"),
            ),
            ElevatedButton(
              onPressed: () => context.read<Counter>().decrement(),
              child: const Text("decrement"),
            ),
          ],
        ),
      ),
    );
  }
}
```

ChangeNotifierProvider の説明は以下とあります。今回は create 内で ChangeNotifier を継承した Counter クラスを生成しています。

> Listens to a [ChangeNotifier], expose it to its descendants and rebuilds dependents whenever [ChangeNotifier.notifyListeners] is called.

また、Provider は BuildContext に対して、以下のような Extension を提供しています。

```dart
extension ReadContext on BuildContext {
  T read<T>() {
    return Provider.of<T>(this, listen: false);
  }
}

extension WatchContext on BuildContext {
  T watch<T>() {
    return Provider.of<T>(this);
  }
}
```

Provider.of<T>(this, listen: false)は 内部で getElementForInheritedWidgetOfExactType を行っており、O(1)で状態を取得します。
また、listen を true にした場合は、dependOnInheritedWidgetOfExactType を呼び出して、値の変更を監視できるようにします。

## Provider と InheritedWidget

ChangeNotifierProvider クラスは ListenableProvider を継承しており、ListenableProvider は InheritedProvider を継承しています。以下のコンストラクタで InheritedProvider が initialize されます。

```dart
class InheritedProvider<T> extends SingleChildStatelessWidget {
  InheritedProvider({
      Key? key,
      Create<T>? create,
      T Function(BuildContext context, T? value)? update,
      UpdateShouldNotify<T>? updateShouldNotify,
      void Function(T value)? debugCheckInvalidValueType,
      StartListening<T>? startListening,
      Dispose<T>? dispose,
      this.builder,
      bool? lazy,
      Widget? child,
    })  : _lazy = lazy,
          _delegate = _CreateInheritedProvider(
            create: create,
            update: update,
            updateShouldNotify: updateShouldNotify,
            debugCheckInvalidValueType: debugCheckInvalidValueType,
            startListening: startListening,
            dispose: dispose,
          ),
          super(key: key, child: child);
    <!-- 省略 -->
}
```

このクラスには以下の説明があります。

> A generic implementation of an [InheritedWidget]. Any descendant of this widget can obtain `value` using [Provider.of].

この ChangeNotifierProvider を利用した場合、上記クラスを継承しているので、下位 widgets からのアクセスが可能となるみたいです。

TODO: InheritedWidget との関係性をコードからもう少し深ぼりたいところですが、疲れたので次回時間があるときに深掘ります。\_InheritedProviderScope クラスが、直接 InheritedWidget を継承しているので、その辺を中心に追っていきたいです

## Summary

Provider の使いつつ、内部的な実装について見ていきました。

## Ref

Provider: https://github.com/rrousselGit/provider
