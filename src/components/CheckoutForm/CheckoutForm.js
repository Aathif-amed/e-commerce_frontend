import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../utils/apiCalls";
import api from "../../utils/api";
import "./checkoutForm.css";
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const handlePay = async (event) => {
    event.preventDefault();
    try {
      if (!stripe || !elements || user.cart.count <= 0) return;
      setPaying(true);
      const paymentData = await api.post(
        "/order/createPayment",
        {
          amount: user.cart.total,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log(paymentData.data.client_secret);
      const { paymentIntent } = await stripe.confirmCardPayment(
        paymentData.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      setPaying(false);

      if (paymentIntent) {
        createOrder({
          body: { userId: user._id, cart: user.cart, address, country },
          userToken: user.token,
        }).then((res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
              navigate("/orders");
            }, 3000);
          }
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Form onSubmit={handlePay} className="checkoutForm">
      <Row className="p-4 pb-0">
        {alertMessage && <Alert dismissible>{alertMessage}</Alert>}

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={user.name}
              disabled
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={user.email}
              disabled
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="p-4 pt-0 pb-0">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="p-4 pt-0">
        <label htmlFor="card-element">Card</label>
        <CardElement id="card-element" className="mt-2 mb-3" />
        <p className="card_details">
          <b>Card No: </b>4242 4242 4242 4242 <b>MM/YY: </b>0242 <b>CVC: </b>424{" "}
          <b>Zip: </b> 42424
        </p>
        <Button
          className="mt-2"
          type="submit"
          variant={isSuccess ? "success" : "dark"}
          disabled={user.cart.count <= 0 || paying || isSuccess}
        >
          {paying ? (
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Pay"
          )}
        </Button>
      </Row>
    </Form>
  );
}

export default CheckoutForm;
