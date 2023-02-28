export interface Todo {
  id: string;
  text: string;
}

export interface TodoListProps {
  items: {
    id: string;
    text: string;
  }[];
  onDeleteTodo: (id: string) => void;
}

export type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};
