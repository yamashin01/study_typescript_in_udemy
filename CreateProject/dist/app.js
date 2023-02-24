"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, manday, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.manday = manday;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addProject(title, description, manday) {
        const newProject = new Project(Math.random().toString(), title, description, manday, ProjectStatus.Active);
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
class Component {
    constructor(templateId, hosElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hosElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
class ProjectItem extends Component {
    get manday() {
        if (this.project.manday < 20) {
            return this.project.manday.toString() + "人日";
        }
        else {
            return (this.project.manday / 20).toString() + "人月";
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(e) {
        console.log(e);
    }
    dragEndHandler(e) {
        console.log(e, "Drag終了");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.manday;
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
    }
    configure() {
        pjState.addListener((projects) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const pjItem of this.assignedProjects) {
            new ProjectItem(listEl.id, pjItem);
        }
    }
}
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleFormElement = this.element.querySelector("#title");
        this.descriptionFormElement = this.element.querySelector("#description");
        this.mandayFormElement = this.element.querySelector("#manday");
        this.configure();
    }
    renderContent() { }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
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
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const pjInput = new ProjectInput();
const activePjList = new ProjectList("active");
const finishedPjList = new ProjectList("finished");
