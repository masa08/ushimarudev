---
title: 'FlutterのRiverpodを理解する'
createdAt: '2023-07-10'
updatedAt: '2023-07-10'
description: 'FlutterのRiverpodを理解する'
---

## Motivation

前回の記事で Inherited Widget と Provider について考察していったので、今回は Riverpod を見ていきます。

## What is Riverpod

公式ドキュメントには以下のような説明があります。

> Riverpod（Provider のアナグラム）は Flutter/Dart のためのリアクティブなキャッシングフレームワークです。 Riverpod はネットワークリクエストの取得やキャッシュ、結合、再計算を自動的に行い、さらにエラーの処理も行います。

また、以下のように記述があることから、Riverpod が Provider の後継ライブラリとして作成されたことがわかります。

> Riverpod is designed to be the spiritual successor of Provider. Hence the name "Riverpod", which is an anagram of "Provider".

Provider との違いは、以下のように説明されています。

> At the same time, think of Riverpod as what Provider could've been if it continued to mature for a few years. Riverpod fixes various fundamental problems with Provider, such as but not limited to:

- Significantly simplifying the combination of "providers". Instead of the tedious and error-prone ProxyProvider, Riverpod exposes simple yet powerful utilites such as ref.watch and ref.listen.
- Allowing multiple "provider" to expose a value of the same type.
  This removes the need for defining custom classes when exposing a plain int or String would work just as well.
- Removing the need to re-define providers inside tests. With Riverpod, providers are ready to use inside tests by default.
- Reducing the over-reliance on "scoping" to dispose objects by offering alternate ways to dispose objects (autoDispose) While powerful, scoping a provider is fairly advanced and hard to get right.

Riverpod を導入すれば、Provider で実現するのが不便だった部分に対応しつつ、状態管理やキャッシュ、UI stack の扱いなど、モバイルアプリケーションにおいて必須となってくる部分の実装を実現することができます。

## Usage

Riverpod の実装例です。公式ドキュメントから引用しています。

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final helloWorldProvider = Provider((_) => 'Hello world');

void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final String value = ref.watch(helloWorldProvider);

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Example')),
        body: Center(
          child: Text(value),
        ),
      ),
    );
  }
}
```

ProviderScope は StatefullWidget を継承しており、この Widget で Provider の状態を管理しています。以下のようにコメントが記載されています。

> A widget that stores the state of providers.

また DI を行う際は、override メソッドを使得ことで、利用する Provider を差し替えることが可能です。

ProviderScope は以下のコードを build します。

```dart
@override
  Widget build(BuildContext context) {
    <!-- 省略 -->
    return UncontrolledProviderScope(
      container: container,
      child: widget.child,
    );
  }
```

UncontrolledProviderScope の説明は以下になります。

> /// Expose a [ProviderContainer] to the widget tree.

この Widget が InheritedWidget を継承しており、ProviderContainer を通じて Provider の管理を担っています。

ConsumerWidget は ConsumerStatefulWidget を継承しており、ConsumerStatefulWidget は StatefullWidget を継承しています。以下あたりの実装で、Widget が ref を使用することを可能にしています。

```dart
class _ConsumerState extends ConsumerState<ConsumerWidget> {
  @override
  WidgetRef get ref => context as WidgetRef;

  @override
  Widget build(BuildContext context) {
    return widget.build(context, ref);
  }
}
```

これを見ると、ref の実態は context=Element だということがわかります。さらに WidgetRef を見てみると、Provider を参照する際に利用するメソッドが定義されています。

```dart
abstract class WidgetRef {

  T watch<T>(ProviderListenable<T> provider);

  bool exists(ProviderBase<Object?> provider);

  T read<T>(ProviderListenable<T> provider);

  @useResult
  State refresh<State>(Refreshable<State> provider);

  void invalidate(ProviderOrFamily provider);
}
```

ConsumerWidget の場合は、ConsumerStatefulElement が WidgetRef を implements しています。read の実装例は以下のようになっています。

```dart
@override
  T read<T>(ProviderListenable<T> provider) {
    return ProviderScope.containerOf(this, listen: false).read(provider);
  }
```

containerOf は以下のような実装になっており、ここで以前の記事で紹介した dependOnInheritedWidgetOfExactType や getElementForInheritedWidgetOfExactType を用いて、対象の Provider を
探索しています。

```dart
/// Read the current [ProviderContainer] for a [BuildContext].
  static ProviderContainer containerOf(
    BuildContext context, {
    bool listen = true,
  }) {
    UncontrolledProviderScope? scope;

    if (listen) {
      scope = context //
          .dependOnInheritedWidgetOfExactType<UncontrolledProviderScope>();
    } else {
      scope = context
          .getElementForInheritedWidgetOfExactType<UncontrolledProviderScope>()
          ?.widget as UncontrolledProviderScope?;
    }


    return scope.container;
  }
```

## Code generator

Riverpod は code generation を提供しており、労力の少ない方法で Provider の定義を行うことができます。

https://docs-v2.riverpod.dev/ja/docs/about_code_generation

## Flutter hooks

Rivedpod は Flutter Hooks と組み合わせて利用することも可能です。公式ドキュメントにも以下の記載がある通り、React の Hooks にインスパイアされて実装されているので、React 経験者であれば、特に障壁なく使えると思います。

> Hooks are a concept coming from React, and flutter_hooks is merely a port of the React implementation to Flutter.

https://docs-v2.riverpod.dev/ja/docs/about_hooks

## Summary

Riverpod の内部実装を見ていきました。

## Ref

Riverpod: https://docs-v2.riverpod.dev/ja/docs/introduction
