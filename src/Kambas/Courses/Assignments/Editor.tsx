import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import AssignmentEditorFinalizeButtons from "./AssignmentEditorFinalizeButtons";
import * as db from "../../Database";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useState } from "react";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments;
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [duedate, setDuedate] = useState("");
  const [available, setAvailable] = useState("");

  const handleSave = () => {
    if (aid) {
      const updatedAssignment = {
        _id: aid,
        title,
        course: cid,
        available,
        duedate,
        points,
        description,
      };
      dispatch(updateAssignment(updatedAssignment));
    } else {
      const newAssignment = {
        title,
        course: cid,
        available,
        duedate,
        points,
        description,
      };
      dispatch(addAssignment(newAssignment));
    }
    navigate(`/Kambas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambas/Courses/${cid}/Assignments`);
  }
  return (
    <div>
      {assignments
        .filter((assignment: any) => assignment._id === aid)
        .map((assignment: any) => (
          <Container
            key={assignment._id}
            className="ms-3"
            id="wd-assignments-editor"
          >
            <label htmlFor="wd-name">Assignment Name</label>
            <InputGroup id="wd-name">
              <FormControl
                defaultValue={assignment.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <Form.Group className="mt-3 mb-3">
              <Form.Control
                as="textarea"
                rows={12}
                id="wd-assignment-description"
                defaultValue={assignment.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3 align-items-center">
              <Form.Label as={Col} sm={3} className="text-end">
                Points
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  defaultValue={assignment.points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  placeholder="Enter points"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 align-items-center">
              <Form.Label column sm={3} className="text-end">
                Assignment Group
              </Form.Label>
              <Col sm={9}>
                <Form.Select>
                  <option>ASSIGNMENTS</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 align-items-center">
              <Form.Label column sm={3} className="text-end">
                Display Grade as
              </Form.Label>
              <Col sm={9}>
                <Form.Select>
                  <option>Percentage</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 align-items-start">
              <Form.Label column sm={3} className="text-end">
                Submission Type
              </Form.Label>
              <Col sm={9}>
                <Form.Group className="border p-3 rounded">
                  <Form.Select as={Row}>
                    <option>Online</option>
                    <option>In Person</option>
                  </Form.Select>
                  <Form.Group as={Row}>
                    <Form.Label className="fw-bold mt-3 mb-3">
                      Online Entry Options
                    </Form.Label>
                    <div id="online-entry-options">
                      <Form.Check type="checkbox" label="Text Entry" />
                      <Form.Check
                        type="checkbox"
                        label="Website URL"
                        defaultChecked
                      />
                      <Form.Check type="checkbox" label="Media Recordings" />
                      <Form.Check type="checkbox" label="Student Annotation" />
                      <Form.Check type="checkbox" label="File Uploads" />
                    </div>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 align-items-start">
              <Form.Label column sm={3} className="text-end">
                Assign
              </Form.Label>

              <Col sm={9}>
                <Form.Group className="mb-3 border p-3 rounded">
                  <Form.Label className="fw-bold">Assign to</Form.Label>
                  <Form.Select className="mb-3">
                    <option>Everyone</option>
                  </Form.Select>

                  <Form.Label className="fw-bold">Due</Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="mb-3"
                      type="datetime-local"
                      defaultValue={assignment.duedate}
                      onChange={(e) => setDuedate(e.target.value)}
                    />
                  </InputGroup>

                  <Form.Group as={Row} className="mb-3 align-items-center">
                    <Col sm={6}>
                      <Form.Label className="fw-bold">
                        Available from
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="datetime-local"
                          defaultValue={assignment.available}
                          onChange={(e) => setAvailable(e.target.value)}
                        />
                      </InputGroup>
                    </Col>

                    <Col sm={6}>
                      <Form.Label className="fw-bold">Until</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="datetime-local"
                          defaultValue={assignment.duedate}
                          onChange={(e) => setDuedate(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Form.Group>
            <hr />
            <AssignmentEditorFinalizeButtons onSave={handleSave} onCancel={handleCancel} />
          </Container>
        ))}
    </div>
  );
}
