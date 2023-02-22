import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import signIn_Image from "../../assets/signIn.png";
import "./signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    alert("form");
  };
  return (
    <Container className="signup_container">
      <Row>
        <Col md={6} className="signup_image-container ">
          <Image src={signIn_Image} className="signup_image"></Image>
        </Col>
        <Col md={6} className="signup_form-container">
          <Form className="signup_form" onSubmit={handleSubmit}>
            <h1 className="mt-3 mb-4 text-center">Sign Up</h1>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Name"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
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
              <Button type="submit"  variant="secondary" >Submit</Button>
            </Form.Group>
            <p className="text-center">
              Already have an account? <Link to="/login" className="signInlink">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
