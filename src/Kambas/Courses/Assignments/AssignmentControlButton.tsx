import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButton() {
  return (
    <div className="float-end">
      <span className="border border-dark rounded-pill px-3 py-1">40% of Total</span>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
