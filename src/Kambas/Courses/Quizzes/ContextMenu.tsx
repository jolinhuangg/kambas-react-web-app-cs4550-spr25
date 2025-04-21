import { Dropdown} from "react-bootstrap";
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
        cursor: "pointer",
        border: "1px solid lightgray", // Bootstrap border color
        background: "#F0F0F0",
        borderRadius: "3px",   // Slightly rounded
        padding: "4px 5px",
    }}
      
    >
      <BsThreeDotsVertical size={15} />
    </div>
  ));


  export default function ContextMenu() {
    return (
    <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />

        <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item> {/** navigate to QuizDetails */}
        <Dropdown.Item>Delete</Dropdown.Item> 
        <Dropdown.Item>Publish</Dropdown.Item> {/** Option becomes Unpublish */}
        <Dropdown.Item>Copy</Dropdown.Item> {/** copy to another course (optional) */}
        <Dropdown.Item>Sort</Dropdown.Item> {/** csort by name, due date, available date (optional) */}
        </Dropdown.Menu>
    </Dropdown>
    )
  }