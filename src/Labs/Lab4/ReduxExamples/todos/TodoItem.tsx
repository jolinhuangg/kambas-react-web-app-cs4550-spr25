import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item
      key={todo.id}
      className="d-flex align-items-center justify-content-between"
    >
      <span className="me-5">{todo.title}</span>
      <div>
        <Button
          variant="primary"
          className="me-2"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          {" "}
          Edit{" "}
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          {" "}
          Delete{" "}
        </Button>
      </div>
    </ListGroup.Item>
  );
}
