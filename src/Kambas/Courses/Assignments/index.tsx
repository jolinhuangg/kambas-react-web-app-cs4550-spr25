import { ListGroup, Container, InputGroup, FormControl } from "react-bootstrap";
import AssignmentControls from "./AssignmentControls";
import AssignmentIcons from "./AssignmentIcons";
import AssignmentControlButton from "./AssignmentControlButton";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import DeleteAssignmentPopup from "./DeleteAssignmentPopup";
import { useState } from "react";

function formatDateNative(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function convert24to12(timeStr: string) {
  if (!timeStr) return "";
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  return `${hour}:${minute}${period}`;
}

export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [deleteAssignmentId, setDeleteAssignmentId] = useState<string | null>(null);

  return (
    <Container className="ms-3" id="wd-assignments">
      <div className="d-flex justify-content-between mb-4">
        <InputGroup id="wd-search-assignment">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." />
        </InputGroup>

        {isFaculty && <AssignmentControls />}
      </div>

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3" />
            ASSIGNMENTS
            {isFaculty && <AssignmentControlButton />}
          </div>

          <ul id="wd-assignments" className="list-group rounded-0">
            {assignments.filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-assignment list-group-item p-2 border-gray"
                >
                  <div className="d-flex align-items-center">
                    <AssignmentIcons />
                    <div className="ms-4 flex-grow-1">
                      <a
                        href={`#/Kambas/Courses/${assignment.course}/Assignments/${assignment._id}/`}
                        className="wd-assignment-link"
                      >
                        {assignment.title}
                      </a>

                      <div className="small">
                        <span className="text-danger fs-6">
                          Multiple Modules
                        </span>
                        <span className="text-muted"> | </span>
                        <span className="text-muted fw-bold fs-6">
                          Not available until
                        </span>
                        <span className="text-muted fs-6">
                          {formatDateNative(
                            assignment.available.split("T")[0]
                          )}{" "}
                          at{" "}
                          {convert24to12(assignment.available.split("T")[1] || "00:00")}
                        </span>
                        <span className="text-muted"> | </span>
                        <span className="text-muted fw-bold fs-6"> Due </span>
                        <span className="text-muted fs-6">
                          {formatDateNative(
                            assignment.duedate.split("T")[0]
                          )}{" "}
                          at{" "}
                          {convert24to12(assignment.duedate.split("T")[1] || "00:00")}
                        </span>
                        <span className="text-muted"> | </span>
                        <span className="text-muted fs-6">
                          {assignment.points} points
                        </span>
                      </div>
                    </div>
                    {isFaculty && (
                      <div className="float-end">
                        <FaTrash
                          className="text-danger me-2 mb-1"
                          onClick={() =>
                            setDeleteAssignmentId(assignment._id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <GreenCheckmark />
                        <IoEllipsisVertical className="fs-4" />
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </ListGroup.Item>
      </ListGroup>

      {deleteAssignmentId && (
        <DeleteAssignmentPopup
          assignmentId={deleteAssignmentId}
          onClose={() => setDeleteAssignmentId(null)}
        />
      )}
    </Container>
  );
}
