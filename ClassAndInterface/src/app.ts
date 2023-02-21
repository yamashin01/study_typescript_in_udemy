// Functionのインターフェース
// type AddFn = (a: number, b:number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};
console.log(add(3, 5));

interface Named {
  readonly name: string; // publicやprivateは使えない
  outputName?: string; // ?をつければオプショナルになる（必須ではなくなる）
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

// interfaceはtypeで宣言することも可能
// type Person = {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// };

class Person implements Greetable {
  name: string;
  age: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

// let user1: Person;
let user1: Greetable;
user1 = new Person("Max");
// user1.name = "Taro"; // readonlyがついていたらError

// user1 = {
//   name: "Max",
//   age: 30,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };

user1.greet("Hello. I am");
