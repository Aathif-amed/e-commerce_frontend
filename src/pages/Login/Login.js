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
import signIn_Image from "../../assets/signIn.png"
import './login.css'
function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
  const handleSubmit = () => {
    alert("form");
  };
  return (
    <Container className="login_container">
      <Row>
        <Col md={6} className="login_image-container ">
          <Image src={signIn_Image} className="login_image"></Image>
        </Col>
        <Col md={6} className="login_form-container">
          <Form className="login_form" onSubmit={handleSubmit}>
            <h1 className="mt-3 mb-4 text-center">LOGIN</h1>
          
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
        
           
       
            <Form.Group className="text-center mb-3">
              <Button type="submit"  variant="secondary" >Login</Button>
            </Form.Group>
            <p className="text-center">
              Don't have an account? <Link to="/signup" className="registerlink">Sign Up</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
