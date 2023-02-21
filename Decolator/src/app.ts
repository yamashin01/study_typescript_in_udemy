///// デコレータ
// メタプログラミング（開発者用の機能、ユーザーからは見えない）のシステムの1つ。
// クラスや関数などが正しく動いていることを保証する機能。

///// デコレータ関数
// 宣言されたものをログに出力する関数
// クラスのデコレータの引数は1つ
// function Logger(constructor: Function) {
//   console.log("ログ出力中...");
//   console.log(constructor);
// }

// // デコレータ関数の冒頭に@をつけると、呼び出される
// @Logger
// class Person {
//   name = "Max";

//   constructor() {
//     console.log("Personオブジェクトを作成中...");
//   }
// }

// const pers = new Person();

// console.log(pers);

///// デコレータファクトリ
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// function WithTemplate(template: string, hookId: string) {
//   return function(constructor: Function) {

//   }
// }

@Logger("ログ出力中 - Person")
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person();

console.log(pers);
