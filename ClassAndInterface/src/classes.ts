abstract class Department {
  static fiscalYear = 2020;
  // private id: string;
  // name: string;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
    // console.log(this.fiscalYear);
  }

  // describe(this: Department) {
  //   // console.log("Department: " + this.name);
  //   console.log(`${this.id} : ${this.name}`);
  // }
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  printITDepartment() {
    console.log(this.admins);
  }

  describe() {
    // console.log("Department: " + this.name);
    console.log(`IT部門 ${this.id} : ${this.name}`);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // シングルトンインスタンス
  static getInstance() {
    if (AccountingDepartment.instance) {
      return AccountingDepartment.instance;
    }
    return new AccountingDepartment("d2", []);
  }

  get latestReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。");
  }

  set latestReport(value: string) {
    if (!value) {
      throw new Error("追加するレポートが誤っています。");
    }
    this.addReport(value);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReport() {
    console.log(this.reports);
  }

  addEmployee(employee: string): void {
    this.employees.push(`accountingMember: ${employee}`);
  }
  describe() {
    // console.log("Department: " + this.name);
    console.log(`会計部門 - ${this.id} : ${this.name}`);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

// const accounting = new Department("d1", "Accounting");
const it = new ITDepartment("d1", ["Max"]);

// const accounting = new AccountingDepartment("d1", []);
const accounting = AccountingDepartment.getInstance(); // シングルトンインスタンス
console.log(accounting);
accounting.describe();

accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// accounting.employees[2] = "Elen";
accounting.addEmployee("Elen");

accounting.addReport("something");
console.log(accounting.latestReport);

accounting.latestReport = "通期レポート";
accounting.printReport();

// console.log(accounting);

accounting.addEmployee("JIN");
accounting.printEmployeeInformation();

// const accountingCopy = { name: "Dummy", describe: accounting.describe };

// accountingCopy.describe();
