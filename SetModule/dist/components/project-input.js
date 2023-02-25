var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base-component.js";
import { validate } from "../util/validation.js";
import { autobind } from "../decolators/autobind.js";
import { pjState } from "../state/project-state.js";
export class ProjectInput extends Component {
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
