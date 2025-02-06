import { Form } from "react-bootstrap";

export default function AssignmentDescription() {
  return (
    <Form.Group className="mt-3 mb-3">
      <Form.Control
        as="textarea"
        rows={12}
        id="wd-assignment-description"
        defaultValue={`The assignment is available online.
                
Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kambas application
- Links to all relevant source code repositories

The Kambas application should include a link to navigate back to the landing page.`}
      />
    </Form.Group>
  );
}
