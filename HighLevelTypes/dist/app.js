"use strict";
var _a;
const e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};
console.log(e1);
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
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
class Car {
    drive() {
        console.log("運転中...");
    }
}
class Truck {
    drive() {
        console.log("トラックを運転中...");
    }
    loadCarg(amount) {
        console.log("荷物を乗せています..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCarg(2000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
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
const userInputElement = document.getElementById("user-input");
userInputElement.value = "こんにちは";
const errorBag = {
    email: "正しいメールアドレスではありません。",
    username: "ユーザー名に記号を含めることはできません。",
};
function add2(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result2 = add2("Hello", " Typescript");
result2.split(" ");
const fetchedUserData = {
    id: "u1",
    name: "user1",
    job: {
        title: "developer",
        description: "TypeScript",
    },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput = "";
const storedData = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT";
console.log(storedData);
