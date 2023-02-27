import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../../utils/apiCalls";
import { BsCartDash } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import {
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaRegCreditCard,
} from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./cartPage.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PKEY);

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => {
    return userCartObj[product._id] !== undefined;
  });
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert("Can't proceed");
    decreaseCart(product);
  }
  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      <Row>
        <h1 className="mt-5 text-center">
          <FaShoppingCart style={{ marginBottom: "5px" }} /> Cart
        </h1>
      </Row>
      {cart.length === 0 && (
        <Row>
          <Alert variant="info" className="emptyCart mt-5">
            <BsCartDash style={{ marginBottom: "5px" }} /> Oops! Your cart is
            empty.
          </Alert>
        </Row>
      )}
      <Row>
        {cart.length > 0 && (
          <Col md={7} className="pt-5">
            <>
              <h1 className="text-center">
                <BsCartCheckFill size={40} color="green" />
              </h1>

              <Table
                responsive="sm"
                striped="columns"
                className="cart-table mt-3 text-center align-middle"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop through cart products */}
                  {cart.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                          alt="productIamge"
                        />
                      </td>
                      <td>₹ {item.price}</td>
                      <td>
                        {!isLoading && (
                          <MdDeleteForever
                            size={30}
                            style={{ marginRight: 10, cursor: "pointer" }}
                            onClick={() =>
                              removeFromCart({
                                body: {
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                },
                                userToken: user.token,
                              })
                            }
                          />
                        )}
                      </td>
                      <td>
                        <span className="quantity-indicator">
                          <FaMinus
                            className=" minus-circle "
                            onClick={() =>
                              handleDecrease({
                                body: {
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                },
                                userToken: user.token,
                              })
                            }
                          />
                          <span>{user.cart[item._id]}</span>
                          <FaPlus
                            className="plus-circle"
                            onClick={() =>
                              increaseCart({
                                body: {
                                  productId: item._id,
                                  price: item.price,
                                  userId: user._id,
                                },
                                userToken: user.token,
                              })
                            }
                          />
                        </span>
                      </td>

                      <td>₹{item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="pt-4 text-end totalText">
                  Total: ₹ {user.cart.total}
                </h3>
              </div>
            </>
          </Col>
        )}
        <Col md={5} className="pt-5 text-center">
          {cart.length !== 0 && (
            <>
              <h1>
                <FaRegCreditCard size={40} color="gray" />
              </h1>
              <div className="d-flex justify-content-center">
                <Elements stripe={stripePromise}>
                  <Col md={10} className="p-4">
                    <CheckoutForm />
                  </Col>
                </Elements>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
