import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

interface AssignmentLessonControlButtonsProps {
  assignmentId: string;
  onDelete: () => void;
}

const AssignmentLessonControlButtons: React.FC<AssignmentLessonControlButtonsProps> = ({ assignmentId, onDelete }) => {
  return (
    <div className="float-end ms-auto">
      <GreenCheckmark />
      <FaTrash
        className="text-danger me-2 mb-1 cursor-pointer"
        data-bs-toggle="modal"
        data-bs-target="#wd-delete-assignment-popup"
        onClick={onDelete}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
};

export default AssignmentLessonControlButtons;