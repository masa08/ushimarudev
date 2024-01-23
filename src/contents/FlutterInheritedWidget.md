---
title: 'Deep dive into InheritedWidget in Flutter'
createdAt: '2023-07-06'
updatedAt: '2023-07-06'
description: 'Deep dive into InheritedWidget in Flutter'
---

## Motivation

Provider は InheritedWidget のラッパーであり、また Riverpod は Provider のデメリットを克服するために作成されたことから、InheritedWidget は Flutter の根幹を構成する Widget の一つです。

今回は、InteritedWidget がどのように使われ、また内部的にどのような処理をしているかを理解していきます。

## Usage of InteritedWidget

InheritedWidget の使い方を見ていきます。以下にコード例を載せます。\_Inherited を定義し、MyHomePage から、\_Inherited.message にアクセスする例です。

```dart
class _Inherited extends InheritedWidget {
  const _Inherited({
    Key? key,
    required this.message,
    required Widget child,
  }) : super(key: key, child: child);

  final String message;

  static _Inherited? of(
    BuildContext context, {
    required bool listen,
  }) {
    return listen
        ? context.dependOnInheritedWidgetOfExactType<_Inherited>()
        : context.getElementForInheritedWidgetOfExactType<_Inherited>()?.widget
            as _Inherited;
  }

  @override
  bool updateShouldNotify(_Inherited old) => message != old.message;
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: _Inherited(
        message: "Hello Inherited Widget",
        child: MyHomePage(),
      ),
    );
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
            const Text(
              'The message from a InheritedWidget below:',
            ),
            Text(
              _Inherited.of(context, listen: true)?.message ?? "",
            ),
          ],
        ),
      ),
    );
  }
}
```

Flutter では ancestor に属している Widget 探すメソッドとして、Element に findAncestorWidgetOfExactType メソッドが提供されていますが、こちらは時間計算量が O(N)かかるので、Tree の深さが深くなればなるほど効率が悪くなります。公式ドキュメントにも、効率が悪いので、以下の場合にのみ使用することを推薦するとの記述があります。

> Calling this method is relatively expensive (O(N) in the depth of the tree). Only call this method if the distance from this widget to the desired ancestor is known to be small and bounded.

一方で、dependOnInheritedWidgetOfExactType と getElementForInheritedWidgetOfExactType に関しては、O(1)で ancestor にアクセスが可能なため、パフォーマンス観点から優れています。

メリットは、React で言う prop drilling をする必要がなくなる点と、 message の値を変えただけで、下位ウィジェットの利用箇所全ての値を更新できる点です。後者に関しては Dependency Injetion にも活用することができます。

## Difference between getElementForInheritedWidgetOfExactType and dependOnInheritedWidgetOfExactType

dependOnInheritedWidgetOfExactType と getElementForInheritedWidgetOfExactType の違いに関しては,
relationship を作るか否かになります。以下は getElementForInheritedWidgetOfExactType のドキュメントから抜粋した一文です。

> This method does not establish a relationship with the target in the way that dependOnInheritedWidgetOfExactType does.

また、dependOnInheritedWidgetOfExactType のドキュメントには以下のような説明もあります。

> The widget found will be a concrete InheritedWidget subclass, and calling dependOnInheritedWidgetOfExactType registers this build context with the returned widget. When that widget changes (or a new widget of that type is introduced, or the widget goes away), this build context is rebuilt so that it can obtain new values from that widget.

つまり、dependOnInheritedWidgetOfExactType で探索した場合は、探索元との relationship を構築し、InheritedWidget の状態が変わるたびに、該当 Widget へ変更通知が送られますが、getElementForInheritedWidgetOfExactType で探索した場合はそうはならないということです。

## Example of Actual Development

実際に開発で使う例として、Theme.of(context)が挙げられます。ThemeData の of メソッドの実装は以下のようになっています。

```dart
static ThemeData of(BuildContext context) {
    final _InheritedTheme? inheritedTheme = context.dependOnInheritedWidgetOfExactType<_InheritedTheme>();
    <!-- 省略 -->
    final ThemeData theme = inheritedTheme?.theme.data ?? _kFallbackTheme;
    return ThemeData.localize(theme, theme.typography.geometryThemeFor(category));
  }
```

context.dependOnInheritedWidgetOfExactType を実行しているところがポイントで、ancestor に存在する \_InheritedTheme を探索し、取得しに行ってます。このように、私たちは定義した Theme を取得して、ツリーのどこからでも O(1)で値が参照できるようになっています。

また、dependOnInheritedWidgetOfExactType で探索を行なっているので、Theme が変更された際は、Theme を参照している Widget に変更が通知され、リビルドされることになります。

## Summary

今回紹介した IntheritedWidget と StateFullWidget を用いた状態管理を利用すれば、ある程度の実装をすることは可能です。が、実際には開発で InheritedWidget を直接利用することはほぼほぼない気がしてます。

現在では Riverpod や、少し前では Provider などを使って、値の参照や状態管理、キャッシュ周りを行なっています。しかし、冒頭記述した通り、これらのライブラリも IntheritedWidget を基盤としている実装箇所も多いので、この Widget について理解しておくことは非常に重要だと思います。

## Ref

InheritedWidget

https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html

findAncestorWidgetOfExactType

https://api.flutter.dev/flutter/widgets/BuildContext/findAncestorWidgetOfExactType.html

dependOnInheritedWidgetOfExactType

https://api.flutter.dev/flutter/widgets/BuildContext/dependOnInheritedWidgetOfExactType.html

getElementForInheritedWidgetOfExactType

https://api.flutter.dev/flutter/widgets/BuildContext/getElementForInheritedWidgetOfExactType.html

mono さんの記事

https://medium.com/flutter-jp/inherited-widget-37495200d965
