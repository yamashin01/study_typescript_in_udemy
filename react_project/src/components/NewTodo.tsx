import React, { useRef } from "react";
import { NewTodoProps } from "../todo.model";
import "./NewTodo.css";

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHanlder = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };
  return (
    <form onSubmit={todoSubmitHanlder}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo内容</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">TODO追加</button>
    </form>
  );
};

export default NewTodo;
