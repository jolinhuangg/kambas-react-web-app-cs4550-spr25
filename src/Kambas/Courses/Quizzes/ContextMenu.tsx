import { Dropdown } from "react-bootstrap";
import { forwardRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";

const CustomToggle = forwardRef<
  HTMLDivElement,
  { onClick?: React.MouseEventHandler<HTMLDivElement> }
>(({ onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick?.(e);
    }}
    style={{
      cursor: "pointer",
    }}
  >
    <BsThreeDotsVertical size={20} />
  </div>
));

interface ContextMenuProps {
  onDelete: () => void | Promise<void>;
  onPublish: () => void | Promise<void>;
  qid: string;
}

export default function ContextMenu({ onDelete, onPublish, qid }: ContextMenuProps) {
  const navigate = useNavigate();
  const { cid } = useParams();
  return (
    <Dropdown align="end">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes/${qid}/edit`)}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
        <Dropdown.Item onClick={onPublish}>Publish</Dropdown.Item>{" "}
      </Dropdown.Menu>
    </Dropdown>
  );
}
