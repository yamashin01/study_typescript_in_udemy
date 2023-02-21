"use strict";
const names = [];
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 20 });
console.log(mergeObj.age);
function countAndDescribe(element) {
    let descriptionText = "値がありません。";
    if (element.length > 0) {
        descriptionText = "値は" + element.length + "個です。";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("お疲れ様です。"));
console.log(countAndDescribe([1, 2]));
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
extractAndConvert({ name: "Max" }, "name");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("data1");
textStorage.addItem("data2");
textStorage.addItem("data4");
textStorage.removeItem("data2");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(1);
