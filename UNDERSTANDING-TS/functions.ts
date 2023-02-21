function add2(n1: number, n2: number) {
  return n1 + n2;
}

function printResult2(num: number) {
  console.log("Result: " + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  const res = cb(result);
  console.log(res);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
  return result;
});

// let combineValues = Function;
let combineValues: (a: number, b: number) => number;
combineValues = add2;

console.log(combineValues(8, 8));
printResult2(add2(5, 15));
