import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import api from "../../utils/api";
import "./OrdersPage.css";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userToken = user.token;
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getOrderdata = async () => {
      try {
        const userOrder = await api.get(`/user/${user._id}/orders`, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        });
        setLoading(false);
        setOrders(userOrder.data);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        alert(error.message);
      }
    };
    getOrderdata();
  }, []);

  //for Modal
  const handleClose = () => setShow(false);

  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;

      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }
  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center mt-3">No orders yet 🥲</h1>;
  }

  return (
    <>
      <Container>
        <h1 className="text-center my-3">Orders 🙂</h1>
        <Row className="p-3 d-flex justify-content-center">
          <Col md={10} className="orderTable">
            <Table
              responsive
              striped
              bordered
              hover
              variant="secondary"
              width="100%"
              className="text-center align-middle m-3"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id}</td>
                    <td>
                      <Badge
                        bg={`${
                          order.status === "processing" ? "dark" : "success"
                        }`}
                        text="white"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td>{order.date}</td>

                    <td>{order.total}</td>
                    <td>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => showOrder(order.products)}
                      >
                        <FaEye size={20} style={{ marginBottom: "4px" }} /> View
                        order
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {/* View order details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => {
          return (
            <Container className="d-flex justify-content-center py-2 gap-2 bg-light">
              <Row>
                <Col md={6}>
                  <img
                    src={order.pictures[0].url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      padding: "5px",
                      borderRadius: "0.5rem",
                    }}
                    alt="productImage"
                  />
                </Col>
                <Col md={6} className="d-flex flex-column mt-2">
                  <p>
                    <b>Name:</b> {order.name}
                  </p>
                  <p>
                    <b>Quantity:</b> {order.count}
                  </p>
                  <p>
                    <b>Price:</b> ₹{Number(order.price)}
                  </p>
                </Col>
              </Row>
            </Container>
          );
        })}
        <Modal.Footer className="bg-transparent">
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrdersPage;
