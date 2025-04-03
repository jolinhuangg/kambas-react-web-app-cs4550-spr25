import React, { FC } from "react";

interface DeleteAssignmentPopupProps {
  assignmentId: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteAssignmentPopup: FC<DeleteAssignmentPopupProps> = ({ onClose, onDelete }) => {
  return (
    <div
      className="modal fade show"
      id="wd-delete-assignment-popup"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
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
            Are you sure you want to remove this assignment?
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
              onClick={onDelete}
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