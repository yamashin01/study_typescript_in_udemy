// ジェネリック型(汎用型)
// 他の特定の型と結合された型
const names: Array<string> = []; // string[]と同じ

// const promise = new Promise<string>((resolve, reject) => {
//   setTimeout(() => {
//     resolve("終わりました！");
//   }, 2000);
// });

// Generic関数
// 関数の引数の型を動的に決める。慣習的にTを使う。2つ目以降の引数の型はアルファベット順にすることが多い。
// Genericで設定した型にも制約をつけることができる
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// console.log(merge({ name: "Max" }, { age: 20 }));
const mergeObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 20 });
console.log(mergeObj.age);

interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T) {
  let descriptionText = "値がありません。";
  if (element.length > 0) {
    descriptionText = "値は" + element.length + "個です。";
  }
  return [element, descriptionText];
}

// lengthプロパティがあれば、全てエラーは出ない
console.log(countAndDescribe("お疲れ様です。"));
console.log(countAndDescribe([1, 2]));

// Genericsの制約
// keyofを用いて、オブジェクトに存在しないキーを設定することを防ぐ
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

// Genericsクラス
// クラス単位でGenericsとなる型を設けることができる
// objectは参照型のため、正常に動かないことがあるので注意（おそらく破壊的メソッドを用いていることが原因）
// -> 型にプリミティブ型の制約をかけるとよし
class DataStorage<T extends number | string | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem("data1");
textStorage.addItem("data2");
textStorage.addItem("data4");
textStorage.removeItem("data2");

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

// const objectStorage = new DataStorage<object>();
