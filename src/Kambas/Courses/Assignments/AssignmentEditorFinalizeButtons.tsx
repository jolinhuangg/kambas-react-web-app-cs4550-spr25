import { Button } from "react-bootstrap";

export default function AssignmentEditorFinalizeButtons() {
    return (
        <div className="w-100 d-flex justify-content-end">
            <Button variant="secondary" className="me-2">
                Cancel
            </Button>
            <Button variant="danger" className="me-2">
                Save
            </Button>
        </div>
    );
}