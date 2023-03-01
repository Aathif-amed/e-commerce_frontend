import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../utils/apiCalls";
import "./signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { error, isLoading, isError }] = useRegisterMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };
  return (
    <Container className="signup_container">
      <Row>
        <Col md={6} className="signup_image-container">
          <Image
            src="https://res.cloudinary.com/amedstack/image/upload/v1677216638/ecomm/design_m7ggbr.jpg"
            className="signup_image"
          ></Image>
        </Col>
        <Col md={6} className="signup_form-container">
          <Form className="signup_form" onSubmit={handleSubmit}>
            <h1 className="mt-3 mb-4 text-center">Sign Up</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="text-center mb-3">
              {isLoading ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <Button type="submit" variant="secondary" disabled={isLoading}>
                  Submit
                </Button>
              )}
            </Form.Group>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="signInlink">
                Sign In
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
