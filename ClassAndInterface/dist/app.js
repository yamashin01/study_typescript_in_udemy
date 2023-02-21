"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
console.log(add(3, 5));
class Person {
    constructor(name) {
        this.age = 0;
        this.name = name;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
let user1;
user1 = new Person("Max");
user1.greet("Hello. I am");
