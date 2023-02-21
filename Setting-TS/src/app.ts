let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

// this is userName
userName = typeof userInput === "string" ? userInput : "error";

let appId = "abc";
const button = document.querySelector("button");

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return n1 - n2;
}

function clickHandler(message: string) {
  //   const userName = "Max";
  console.log("Click! " + message);
}

button?.addEventListener("click", clickHandler.bind(null, "You're welcome!"));
