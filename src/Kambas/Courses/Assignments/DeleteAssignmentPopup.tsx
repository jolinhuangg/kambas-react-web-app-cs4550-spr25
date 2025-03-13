import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

const DeleteAssignmentPopup = ({ assignmentId, onClose }: { assignmentId: string; onClose: () => void }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (assignmentId) {
      dispatch(deleteAssignment(assignmentId));
    }
    if (onClose) onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      id="wd-delete-assignment-popup"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Delete Assignment</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this assignment?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAssignmentPopup;