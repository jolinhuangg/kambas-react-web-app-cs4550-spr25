import { Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

export default function Profile() {
  return (
    <Container id="wd-profile-screen" className="ms-3">
      <h1>Profile</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        defaultValue="alice"
        className="mb-2"
      />
      <Form.Control
        id="wd-password"
        placeholder="password"
        defaultValue="123"
        type="password"
        className="mb-2"
      />
      <Form.Control
        id="wd-first-name"
        placeholder="first name"
        defaultValue="Alice"
        className="mb-2"
      />
      <Form.Control
        id="wd-last-name"
        placeholder="last name"
        defaultValue="Wonderland"
        className="mb-2"
      />
      <Form.Control
        id="wd-dob"
        placeholder="mm/dd/yyyy"
        type="date"
        className="mb-2"
      />
      <Form.Control
        id="wd-email"
        placeholder="email"
        defaultValue="alice@wonderland"
        type="email"
        className="mb-2"
      />
      <Form.Select id="wd-role" className="mb-2">
        <option>User</option>
        <option>Faculty</option>
        <option>Student</option>
      </Form.Select>
      <Link
        id="wd-signout-btn"
        to="/Kambas/Account/Signin"
        className="btn btn-danger w-100 mb-2"
      >
        Signout{" "}
      </Link>
    </Container>
  );
}
