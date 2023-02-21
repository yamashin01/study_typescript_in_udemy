"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, manday) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            manday: manday,
        };
        this.projects.push(newProject);
        for (const linsterFn of this.listeners) {
            linsterFn(this.projects.slice());
        }
    }
}
const pjState = ProjectState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minlength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minlength;
    }
    if (validatableInput.maxlength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxlength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    console.log(isValid);
    return isValid;
}
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        pjState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const pjItem of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = pjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleFormElement = this.element.querySelector("#title");
        this.descriptionFormElement = this.element.querySelector("#description");
        this.mandayFormElement = this.element.querySelector("#manday");
        this.configure();
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
    gatherMethodInput() {
        const enteredTitle = this.titleFormElement.value;
        const enteredDescrition = this.descriptionFormElement.value;
        const enteredManday = this.mandayFormElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descritionValidatable = {
            value: enteredDescrition,
            required: true,
            minlength: 5,
            maxlength: 100,
        };
        const mandayValidatable = {
            value: enteredManday,
            required: true,
            min: 0,
            max: 100,
        };
        if (!validate(titleValidatable) ||
            !validate(descritionValidatable) ||
            !validate(mandayValidatable)) {
            alert("入力値が誤っています");
            return;
        }
        else {
            return [enteredTitle, enteredDescrition, +enteredManday];
        }
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherMethodInput();
        if (Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            pjState.addProject(title, desc, manday);
            this.clearInput();
        }
    }
    clearInput() {
        this.titleFormElement.value = "";
        this.descriptionFormElement.value = "";
        this.mandayFormElement.value = "";
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const pjInput = new ProjectInput();
const activePjList = new ProjectList("active");
const finishedPjList = new ProjectList("finished");
