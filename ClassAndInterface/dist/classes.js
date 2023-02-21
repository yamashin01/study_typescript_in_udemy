"use strict";
class Department {
    static createEmployee(name) {
        return { name: name };
    }
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    printITDepartment() {
        console.log(this.admins);
    }
    describe() {
        console.log(`IT部門 ${this.id} : ${this.name}`);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
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
    set latestReport(value) {
        if (!value) {
            throw new Error("追加するレポートが誤っています。");
        }
        this.addReport(value);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.reports);
    }
    addEmployee(employee) {
        this.employees.push(`accountingMember: ${employee}`);
    }
    describe() {
        console.log(`会計部門 - ${this.id} : ${this.name}`);
    }
}
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
const it = new ITDepartment("d1", ["Max"]);
const accounting = AccountingDepartment.getInstance();
console.log(accounting);
accounting.describe();
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.addEmployee("Elen");
accounting.addReport("something");
console.log(accounting.latestReport);
accounting.latestReport = "通期レポート";
accounting.printReport();
accounting.addEmployee("JIN");
accounting.printEmployeeInformation();
