import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AssignmentControlButton() {
  const handleAddAssignment = () => {
    navigate("/Kambas/Courses/Assignments/AssignmentEditor");
  };

  const navigate = useNavigate();
  return (
    <div className="float-end">
      <span className="border border-dark rounded-pill px-3 py-1">
        40% of Total
      </span>
      <BsPlus
        className="fs-2"
        onClick={handleAddAssignment}
        style={{ cursor: "pointer" }}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
