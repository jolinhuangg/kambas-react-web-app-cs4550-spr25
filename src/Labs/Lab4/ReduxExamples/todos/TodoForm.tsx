import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        style={{ maxWidth: "200px" }}
        className = "me-5"
      />

      <Button
        variant="warning"
        className="me-2"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        {" "}
        Update{" "}
      </Button>

      <Button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        variant="success"
      >
        {" "}
        Add{" "}
      </Button>
    </ListGroup.Item>
  );
}
