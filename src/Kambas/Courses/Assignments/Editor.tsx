import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  // If editing an existing assignment, pre-populate local state
  const existingAssignment =
    aid !== "new" ? assignments.find((a: any) => a._id === aid) : null;

  const [assignment, setAssignment] = useState({
    title: existingAssignment?.title || "",
    description: existingAssignment?.description || "",
    points: existingAssignment?.points || 100,
    duedate: existingAssignment?.duedate || "",
    available: existingAssignment?.available || "",
    availableuntil: existingAssignment?.availableuntil || "",
  });

  const handleSave = async () => {
    try {
      if (aid === "new") {
        const newAssignment = await assignmentsClient.createAssignmentForCourse(
          cid as string,
          {
            title: assignment.title,
            description: assignment.description,
            points: assignment.points,
            duedate: assignment.duedate,
            available: assignment.available,
            availableuntil: assignment.availableuntil,
          }
        );
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await assignmentsClient.updateAssignment({
          _id: aid,
          title: assignment.title,
          description: assignment.description,
          points: assignment.points,
          duedate: assignment.duedate,
          available: assignment.available,
          availableuntil: assignment.availableuntil,
        });
        dispatch(updateAssignment(updatedAssignment));
      }
      navigate(`/Kambas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  return (
    <Container className="ms-3" id="wd-assignments-editor">
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <InputGroup id="wd-name">
            <FormControl
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </InputGroup>
        </div>
        <Form.Group className="mt-3 mb-3">
          <Form.Control
            as="textarea"
            rows={12}
            id="wd-assignment-description"
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label as={Col} sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value, 10),
                })
              }
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
                  value={assignment.duedate}
                  onChange={(e) =>
                    setAssignment({ ...assignment, duedate: e.target.value })
                  }
                />
              </InputGroup>
              <Form.Group as={Row} className="mb-3 align-items-center">
                <Col sm={6}>
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      value={assignment.available}
                      onChange={(e) =>
                        setAssignment({ ...assignment, available: e.target.value })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col sm={6}>
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      value={assignment.availableuntil}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableuntil: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Form.Group>
          </Col>
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-end">
          <button
            onClick={() => navigate(`/Kambas/Courses/${cid}/Assignments`)}
            className="btn btn-secondary me-2"
            type="button"
          >
            Cancel
          </button>
          <button onClick={handleSave} type="button" className="btn btn-danger">
            Save
          </button>
        </div>
      </Form>
    </Container>
  );
}