import Component from "./base-component";
import * as Validation from "../util/validation";
import { autobind } from "../decolators/autobind";
import { pjState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleFormElement: HTMLInputElement;
  descriptionFormElement: HTMLInputElement;
  mandayFormElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleFormElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionFormElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mandayFormElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent(): void {}

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private gatherMethodInput(): [string, string, number] | void {
    const enteredTitle = this.titleFormElement.value;
    const enteredDescrition = this.descriptionFormElement.value;
    const enteredManday = this.mandayFormElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descritionValidatable: Validation.Validatable = {
      value: enteredDescrition,
      required: true,
      minlength: 5,
      maxlength: 100,
    };
    const mandayValidatable: Validation.Validatable = {
      value: enteredManday,
      required: true,
      min: 0,
      max: 100,
    };
    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descritionValidatable) ||
      !Validation.validate(mandayValidatable)
    ) {
      alert("入力値が誤っています");
      return;
    } else {
      return [enteredTitle, enteredDescrition, +enteredManday];
    }
  }

  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherMethodInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      pjState.addProject(title, desc, manday);
      this.clearInput();
    }
  }

  private clearInput() {
    this.titleFormElement.value = "";
    this.descriptionFormElement.value = "";
    this.mandayFormElement.value = "";
  }
}
