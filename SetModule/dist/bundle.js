var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
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
    exports.Component = Component;
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
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
    exports.validate = validate;
});
define("decolators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
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
    exports.autobind = autobind;
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, manday, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.manday = manday;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("state/project-state", ["require", "exports", "models/project", "models/project"], function (require, exports, project_1, project_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pjState = exports.ProjectState = void 0;
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
            const newProject = new project_1.Project(Math.random().toString(), title, description, manday, project_2.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((pj) => pj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const linsterFn of this.listeners) {
                linsterFn(this.projects.slice());
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.pjState = ProjectState.getInstance();
});
define("components/project-input", ["require", "exports", "components/base-component", "util/validation", "decolators/autobind", "state/project-state"], function (require, exports, base_component_1, validation_1, autobind_1, project_state_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_component_1.Component {
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
            if (!(0, validation_1.validate)(titleValidatable) ||
                !(0, validation_1.validate)(descritionValidatable) ||
                !(0, validation_1.validate)(mandayValidatable)) {
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
                project_state_1.pjState.addProject(title, desc, manday);
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
        autobind_1.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    exports.ProjectInput = ProjectInput;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base-component", "decolators/autobind"], function (require, exports, base_component_js_1, autobind_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_component_js_1.Component {
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
            e.dataTransfer.setData("text/plain", this.project.id);
            e.dataTransfer.effectAllowed = "move";
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
        autobind_js_1.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "components/base-component", "models/project", "decolators/autobind", "state/project-state", "components/project-item"], function (require, exports, base_component_2, project_3, autobind_2, project_state_2, project_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_component_2.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(e) {
            if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
                e.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(e) {
            const pjId = e.dataTransfer.getData("text/plain");
            project_state_2.pjState.moveProject(pjId, this.type === "active" ? project_3.ProjectStatus.Active : project_3.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            project_state_2.pjState.addListener((projects) => {
                const relevantProjects = projects.filter((project) => {
                    if (this.type === "active") {
                        return project.status === project_3.ProjectStatus.Active;
                    }
                    return project.status === project_3.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const pjItem of this.assignedProjects) {
                new project_item_1.ProjectItem(listEl.id, pjItem);
            }
        }
    }
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_2.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list"], function (require, exports, project_input_1, project_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_1.ProjectInput();
    new project_list_1.ProjectList("active");
    new project_list_1.ProjectList("finished");
});
