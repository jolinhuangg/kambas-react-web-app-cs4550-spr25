import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentControls() {
    const navigate = useNavigate();
    const { cid } = useParams();

    return (
        <div>
          <Button variant="secondary" className="me-2" id="wd-group-button">
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment" onClick={() => navigate(`/Kambas/Courses/${cid}/Assignments/new`)}>
            Assignment
          </Button>
        </div>
    );
  }