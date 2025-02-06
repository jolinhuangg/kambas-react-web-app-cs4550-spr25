import { Button } from "react-bootstrap";

export default function AssignmentControls() {
    return (
        <div>
          <Button variant="secondary" className="me-2" id="wd-group-button">
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            Assignment
          </Button>
        </div>
    );
  }