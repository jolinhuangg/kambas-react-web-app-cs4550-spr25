import { ListGroup, Container } from "react-bootstrap";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButton from "./AssignmentControlButton";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentIcons from "./AssignmentIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function Assignments() {
  return (
    <Container className="ms-3" id="wd-assignments">
      <div className="d-flex justify-content-between mb-4">
        <InputGroup id="wd-search-assignment">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." />
        </InputGroup>
        <AssignmentControls />
      </div>

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3" />
            ASSIGNMENTS <AssignmentControlButton />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson  ps-1">
              <div className="d-flex align-items-center">
                <AssignmentIcons />
                <div className="ms-4 flex-grow-1">
                  <a
                    href="#/Kambas/Courses/1234/Assignments/123/"
                    className="wd-assignment-link"
                  >
                    A1
                  </a>
                  <div className="small">
                    <span className="text-danger fs-6"> Multiple Modules </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-bold fs-6">
                      {" "}
                      Not available until{" "}
                    </span>
                    <span className="text-muted fs-6"> May 6 at 12:00am</span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-bold fs-6"> Due </span>
                    <span className="text-muted fs-6"> May 13 at 11:59pm</span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fs-6"> 100 points </span>
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson  ps-1">
              <div className="d-flex align-items-center">
                <AssignmentIcons />
                <div className="ms-4 flex-grow-1">
                  <a
                    href="#/Kambas/Courses/1234/Assignments/123/"
                    className="wd-assignment-link"
                  >
                    {" "}
                    A2{" "}
                  </a>
                  <div className="small">
                    <span className="text-danger fs-6"> Multiple Modules </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-bold fs-6">
                      {" "}
                      Not available until{" "}
                    </span>
                    <span className="text-muted fs-6"> May 13 at 12:00am</span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-bold fs-6"> Due </span>
                    <span className="text-muted fs-6"> May 20 at 11:59pm</span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fs-6"> 100 points </span>
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson  ps-1">
              <div className="d-flex align-items-center">
                <AssignmentIcons />
                <div className="ms-4 flex-grow-1">
                  <a
                    href="#/Kambas/Courses/1234/Assignments/123/"
                    className="wd-assignment-link"
                  >
                    A3
                  </a>
                  <div className="small">
                    <span className="text-danger fs-6"> Multiple Modules </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-bold fs-6">
                      {" "}
                      Not available until{" "}
                    </span>
                    <span className="text-muted fs-6"> May 20 at 12:00am</span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-bold fs-6"> Due </span>
                    <span className="text-muted fs-6"> May 27 at 11:59pm</span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fs-6"> 100 points </span>
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
