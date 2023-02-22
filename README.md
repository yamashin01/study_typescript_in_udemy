# study_typescript_in_udemy

## 環境構築

### Typescript のインストール

```
$ sudo npm install -g typescript
```

### typescript ファイル(ts ファイル)の javascript へのコンパイル

```
$ tsc XXXXX.ts
```

## Typescript の基本と型

### 型の種類

number, string, boolean, Object, Array, Tuple, Enum

### Literal 型と Union 型

- Literal 型：型を具体的な値として明示する( `num: 20` )
- Union 型：型として明示する( `num: number` )

### 型推論

型を明示的に書かなくても、Typescript が自動で型を推論する処理<br>

### 型エイリアス

事前に処理で使う型を別名で宣言する<br>
`type ConversionDescriptor = "as-number" | "as-text";`

### function 型、コールバック関数型

コールバック関数はアロー関数で引数や戻り値を明示する<br>

```typescript
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  const res = cb(result);
  console.log(res);
}
```

### unknown 型、never 型

あまり使われることはない。

## Typescript の設定とコンパイラ

### Watch モード

Typescript のファイルに変更があると、自動で javascript に変換する<br>

```
$ tsc app.ts --watch
```

### Typescript ファイルの自動反映

プロジェクト内の全ての ts ファイルを自動で js ファイルに変換する

1. typescript のプロジェクトであることを宣言する(tsconfig.json ファイルが生成される)<br>

```
$ tsc --init
```

2. tsc を実行する(`tsc --watch`も可能)<br>

```
$ tsc
```

### tsconfig.json ファイルの設定

#### 自動で JS ファイルに変換して欲しくないファイルの指定

```json
"exclude": [
    "analytics.ts",
    "**/*.dev.ts",  // **は全フォルダを指定、
    "node_modules"  // would be default
]
```

#### js に変換したいファイルの指定（指定がなければ全 TS ファイルを変換）

```json
"include": [
    "analytics.ts",
    "app.ts",
]
```

#### tsconfig.json の基本設定（抜粋）

- `rootDir`と`outDir`<br>
  TS ファイルの読み込み元フォルダと JS ファイルの出力先フォルダの指定。HTML ファイルの指定先も変える必要があるので注意
- `noEmitOnError`<br>
  TS ファイルにエラーがある場合、JS ファイルを出力しない
- `noUnusedLocals`と`noUnusedParameters`と`noImplicitReturns`<br>
  TS ファイルの未使用変数や引数がある場合、又は特定の関数で戻り値がある時とない時がある場合、エラーとなる

## クラス

### クラスとは

オブジェクトの設計図。原則、インスタンス化して使う

```typescript
class Department {
  constructor() {}
}
const department = new Department();
```

### 継承とは

ベースクラスをもとに継承クラスを生成する

```typescript
class Department {}
class ITDepartment extends Department {}
```

### カプセル化（public, private, protected）

- `public` : 任意の場所からアクセスできる
- `protected` : 宣言したクラス及び継承クラスからアクセスできる
- ` private` : 宣言したクラス内でのみアクセスできる<br>

プロパティの宣言は、`constructor`の引数でも良い。

```typescript
abstract class Department {
  // private id: string;
  // name: string;
  constructor(protected readonly id: string, public name: string) {}
}
```

### Getter / Setter

private なプロパティへのアクセス

```typescript
class AccountingDepartment extends Department {
  private lastReport: string;

  get latestReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。");
  }

  set latestReport(value: string) {
    if (!value) {
      throw new Error("追加するレポートが誤っています。");
    }
    this.addReport(value);
  }
}
```

### static メソッド、プロパティ

static（静的）メソッドやプロパティは、インスタンス化せずに呼び出すことができる

```typescript
class Department {
  static fiscalYear = 2020;
  static createEmployee(name: string) {
    return { name: name };
  }
}
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
```

### 抽象クラス

抽象クラスは、直接インスタンス化できない。継承して使うことを強制する。抽象クラス内で、`abstract`のあるメソッドは、継承先でオーバーライドすることを強制する。

```typescript
abstract class Department {
  abstract describe(this: Department): void;
}
class ITDepartment extends Department {
  describe() {
    console.log(`IT部門 ${this.id} : ${this.name}`);
  }
}
```

### シングルトン

特定のクラスのインスタンスが 1 つしか存在できないようにする。<br>
`constructor`に`private`をつけることで設定できる。

```typescript
class AccountingDepartment extends Department {
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // シングルトンインスタンス
  static getInstance() {
    if (AccountingDepartment.instance) {
      return AccountingDepartment.instance;
    }
    return new AccountingDepartment("d2", []);
  }
}

const accounting = AccountingDepartment.getInstance(); // シングルトンインスタンス
```

## インターフェース

### インターフェースとは

オブジェクトの構造を定義する。値を持たせることはできない。Typescript の機能のため、Javascript では設定できない。`Type`と似ているが、インターフェースを使うほうが一般的。

```typescript
interface Person {
  name: string; // publicやprivateは使えない
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Max",
  age: 30,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};
```

`interface`は`type`で宣言することも可能

```typescript
type Person = {
  name: string;
  age: number;

  greet(phrase: string): void;
};
```

### インターフェースのクラスへの実装

`implements`により、クラスにインターフェースを実装できる。1 つのクラスに複数のインターフェースを実装することも可能。

- プロパティを読み取り専用にする場合には`readonly`をつける。
- プロパティを必須にしない（オプショナルにする）場合には`?`をつける。

```typescript
interface Greetable {
  readonly name: string; // 読み取り専用
  age?: string; // オプショナル

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number = 30; // インターフェースにないプロパティも追加できる

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}
```

### インターフェースの継承

`extends`により、インターフェースを継承することもできる。インターフェースでは複数の継承も可能（クラスではできない）。

```typescript
interface Named {
  name: string;
  outputName: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}
```

## 高度な型

### 交差型（Intersection Type）

`&`により、複数の型の結合を行う。

```typescript
type Admin = {
  name: string;
  privileges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};

type ElevateEmployee = Admin & Employee;
// interface ElevateEmployee extends Admin, Employee {}; // interfaceでもほぼ同じ型を宣言できる

const e1: ElevateEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // 共通している型（ここではnumber）になる
```

### 型ガード（タイプガード）

意図しない型によるエラーを防ぐ。`if`文などを用いて行う

```typescript
// 処理1 : typeofによる型判定
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// inによる型の判定（オブジェクトの型判定）
function printEmployeeInformation(emp: UnknownEmployee) {
  if ("privileges" in emp) {
    console.log("Privilage: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("StartDate: " + emp.startDate);
  }
}

// instanceofによる型の判定（クラスの型判定）
class Car {
  drive() {
    console.log("運転中...");
  }
}
class Truck {
  drive() {
    console.log("トラックを運転中...");
  }
  loadCarg(amount: number) {
    console.log("荷物を乗せています..." + amount);
  }
}
type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCarg(2000);
  }
}
```

### 型キャスト

型を明確にするための方法。`<型>`を使う方法と`as 型`を使う方法がある。

```typescript
// <>によるキャスト
const userInputElement = <HTMLInputElement>(
  document.getElementById("user-input")
);
userInputElement.value = "こんにちは";
```

```typescript
// asによるキャスト
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement;
userInputElement.value = "こんにちは";
```

### インデックス型

プロパティ名及びプロパティ数がわからない場合、[]で型のみ設定できる

```typescript
interface ErrorContainer {
  [prop: string]: string;
}
const errorBag: ErrorContainer = {
  email: "正しいメールアドレスではありません。",
  username: "ユーザー名に記号を含めることはできません。",
};
```

### 関数オーバーロード

異なる関数の呼び方が複数設定できる

```typescript
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result2 = add2("Hello", " Typescript");
result2.split(" "); // function add2(a: string, b: string): string;でオーバーロードするため、result2はstringであるとわかる
```

### NULL 合体演算子

`??`で繋ぐことにより、1 つ目の変数の NULL 判定した値を取得できる。

```typescript
const userInput = "user1";
const storedData = userInput ?? "DEFAULT"; // user1が入る

const userInput = "";
const storedData = userInput ?? "DEFAULT"; // Defaultが入る
```

## Generics

### Generics とは

ジェネリック型(汎用型)のこと。
関数の引数の型を動的に決める。慣習的に T を使う。2 つ目以降の引数の型はアルファベット順にすることが多い。

```typescript
// Genericで設定した型にも制約をつけることができる
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

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

// lengthプロパティがある型（string、配列等）であれば、エラーは出ない
console.log(countAndDescribe("お疲れ様です。"));
console.log(countAndDescribe([1, 2]));
```

### Generics の制約

keyof を用いて、オブジェクトに存在しないキーを設定することを防ぐ

```typescript
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");
```

### Generics クラス

クラス単位で Generics となる型を設けることができる。<br>
object は参照型のため、正常に動かないことがあるので注意（破壊的メソッドを用いていることが原因）。<br>
-> 型にプリミティブ型の制約をかけるとよし

```typescript
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
textStorage.removeItem("data2");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

// const objectStorage = new DataStorage<object>();  // objectは参照型のため誤作動を起こす
```
