import { Button } from "react-bootstrap";

interface FinalizeButtonsProps {
    onSave: () => void;
    onCancel: () => void;
  }

export default function AssignmentEditorFinalizeButtons({
  onSave,
  onCancel,
}: FinalizeButtonsProps) {
  return (
    <div className="w-100 d-flex justify-content-end">
      <Button variant="secondary" className="me-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="danger" className="me-2" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}