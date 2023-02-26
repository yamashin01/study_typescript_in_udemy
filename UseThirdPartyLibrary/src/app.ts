import _ from "lodash";
import { Product } from "./product.model";
import "reflect-metadata";
import { plainToInstance } from "class-transformer";

console.log(_.shuffle([1, 2, 3]));

// アンビエント宣言
declare var GLOBAL: string;
console.log(GLOBAL);

// クラストランスフォーマー
// 通常のオブジェクトをインスタンス化する。TypeScriptに対応したライブラリ
const products = [
  { title: "商品A", price: 100 },
  { title: "商品B", price: 200 },
];

//const product = new Product("商品1", 100);
//console.log(product.getInformation());

// const loadedProducts = products.map((product) => {
//   return new Product(product.title, product.price);
// });
const loadedProducts = plainToInstance(Product, products);

for (let product of loadedProducts) {
  console.log(product.getInformation());
}
