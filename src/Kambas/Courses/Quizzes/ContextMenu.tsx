import { Dropdown } from "react-bootstrap";
import { forwardRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const CustomToggle = forwardRef<HTMLDivElement, { onClick?: React.MouseEventHandler<HTMLDivElement> }>(({ onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick?.(e);
    }}
    style={{
      cursor: "pointer"
    }}
  >
    <BsThreeDotsVertical size={20} />
  </div>
));

interface ContextMenuProps {
  onDelete: () => void | Promise<void>;
}

export default function ContextMenu({ onDelete }: ContextMenuProps) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />

      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item> {/* navigate to QuizDetails */}
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
        <Dropdown.Item>Publish</Dropdown.Item> {/* Option becomes Unpublish */}
        <Dropdown.Item>Copy</Dropdown.Item> {/* Copy to another course (optional) */}
        <Dropdown.Item>Sort</Dropdown.Item> {/* Sort by name, due date, available date (optional) */}
      </Dropdown.Menu>
    </Dropdown>
  );
}