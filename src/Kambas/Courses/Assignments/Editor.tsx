import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import AssignmentEditorDescription from "./AssignmentEditorDescription";
import AssignmentEditorFinalizeButtons from "./AssignmentEditorFinalizeButtons";

export default function AssignmentEditor() {
  return (
    <Container className="ms-3" id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <InputGroup id="wd-name">
        <FormControl defaultValue="A1 - ENV + HTML" />
      </InputGroup>
      <AssignmentEditorDescription />

      <Form.Group as={Row} className="mb-3 align-items-center">
        <Form.Label as={Col} sm={3} className="text-end">
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="number" defaultValue="100" />
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
                defaultValue="2024-05-13T23:59"
              />
            </InputGroup>

            <Form.Group as={Row} className="mb-3 align-items-center">
              <Col sm={6}>
                <Form.Label className="fw-bold">Available from</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </InputGroup>
              </Col>

              <Col sm={6}>
                <Form.Label className="fw-bold">Until</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="datetime-local"
                    defaultValue="2024-05-20T00:00"
                  />
                </InputGroup>
              </Col>
            </Form.Group>
          </Form.Group>
        </Col>
      </Form.Group>
      <hr />
      <AssignmentEditorFinalizeButtons />
    </Container>
  );
}
