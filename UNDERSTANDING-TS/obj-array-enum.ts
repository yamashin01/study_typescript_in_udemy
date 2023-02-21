// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "yota",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"],
// };
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
const person = {
  name: "yota",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

// person.role.push("admin");  // pushはTuple型に追加できるので注意
// person.role[1] = 1;

// let favoriteActivities: string[];
// favoriteActivities = ["aaa"]
console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase);
}

if (person.role == Role.ADMIN) {
  console.log("管理者ユーザ");
}
