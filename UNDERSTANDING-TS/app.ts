let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

userName = typeof userInput === "string" ? userInput : "error";
