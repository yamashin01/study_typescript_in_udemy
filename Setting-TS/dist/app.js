"use strict";
let userInput;
let userName;
userInput = 5;
userInput = "Max";
userName = typeof userInput === "string" ? userInput : "error";
let appId = "abc";
const button = document.querySelector("button");
function add(n1, n2) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return n1 - n2;
}
function clickHandler(message) {
    console.log("Click! " + message);
}
button === null || button === void 0 ? void 0 : button.addEventListener("click", clickHandler.bind(null, "You're welcome!"));
