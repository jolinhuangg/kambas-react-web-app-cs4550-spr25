import ListGroup from "react-bootstrap/ListGroup";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div className="container">
      <h2 className="mb-3">Todo List</h2>
      <ListGroup style={{ maxWidth: "400px" }}>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
