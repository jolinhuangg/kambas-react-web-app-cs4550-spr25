import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambas/Account/Profile");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Container id="wd-signin-screen" className="ms-3">
      <h1>Sign up</h1>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control
            id="wd-username"
            placeholder="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            id="wd-password"
            placeholder="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Button
          id="wd-signup-btn"
          onClick={signup}
          className="w-100 mb-2"
          variant="primary"
        >
          Sign up
        </Button>
      </Form>
      <Link id="wd-signin-link" to="/Kambas/Account/Signin">
        Sign in
      </Link>
    </Container>
  );
}