import { Link } from "react-router-dom";
import { Form, Container } from "react-bootstrap";

export default function Signin() {
  return (
    <Container id="wd-signin-screen" className="ms-3">
      <h1>Sign in</h1>
      <Form.Control id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <Form.Control id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Link id="wd-signin-btn"
            to="/Kambas/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign in </Link>
      <Link id="wd-signup-link" to="/Kambas/Account/Signup">Sign up</Link>
    </Container> );}