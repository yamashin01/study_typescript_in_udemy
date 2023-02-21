///// 交差型
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

console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // 共通している型（ここではnumber）になる

///// 型ガード
// 型に応じて処理を変えたい場合の処理1 : typeofによる型判定
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

// 型に応じて処理を変えたい場合の処理2 : inによる型の判定（オブジェクトの型判定）
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("Privilage: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("StartDate: " + emp.startDate);
  }
}

printEmployeeInformation({
  name: "Ann",
  privileges: ["Engineer", "Doctor"],
  startDate: new Date("2022/1/1"),
});

// 型に応じて処理を変えたい場合の処理3 : instanceofによる型の判定（クラスの型判定）
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

useVehicle(v1);
useVehicle(v2);

///// Descrimanated Union
interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("移動速度： " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 20 });

///// タイプキャスト
// const paragraph = document.getElementById("message-output");
// const userInputElement = <HTMLInputElement>document.getElementById("user-input"); // キャスト１
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement; // キャスト2

userInputElement.value = "こんにちは";

///// インデックス型
// プロパティ名及びプロパティ数がわからない場合、[]で型のみ設定できる
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "正しいメールアドレスではありません。",
  username: "ユーザー名に記号を含めることはできません。",
};

///// functionオーバーロード
// 異なる関数の呼び方が複数設定できる
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

///// オプショナルチェーン
const fetchedUserData = {
  id: "u1",
  name: "user1",
  job: {
    title: "developer",
    description: "TypeScript",
  },
};
console.log(fetchedUserData?.job?.title);

///// NULL合体演算子(ナリッシュコアリッシュ演算子)
const userInput = "";

// const storedData = userInput || "DEFAULT";
const storedData = userInput ?? "DEFAULT";

console.log(storedData);
