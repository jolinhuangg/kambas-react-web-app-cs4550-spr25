import { Link } from "react-router-dom";
import { Form, Container } from "react-bootstrap";

export default function Signup() {
  return (
    <Container id="wd-signin-screen" className="ms-3">
      <h1>Sign up</h1>
      <Form.Control id="wd-username" placeholder="username" className="mb-2" />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <Link
        id="wd-signup-btn"
        to="/Kambas/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up{" "}
      </Link>
      <Link id="wd-signin-link" to="/Kambas/Account/Signin">
        Sign in
      </Link>
    </Container>
  );
}