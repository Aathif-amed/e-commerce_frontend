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
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const userToken = user.token;
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  function markShipped(orderId, ownerId) {
    api
      .patch(
        `/order/${orderId}/markShipped`,
        { ownerId },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then(({ data }) => setOrders(data))
      .catch((error) => console.log(error));
  }

  const handleClose = () => setShow(false);
  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    console.log(productsToShow);
    setShow(true);
    setOrderToShow(productsToShow);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get("/order", {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">No orders yet</h1>;
  }

  function TableRow({ _id, count, owner, total, status, products, address }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>{owner?.name}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>{address}</td>
        <td>
          {status === "processing" ? (
            <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
              Mark as shipped
            </Button>
          ) : (
            <Badge bg="success">Shipped</Badge>
          )}
        </td>
        <td>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showOrder(products)}
          >
            <FaEye size={20} style={{ marginBottom: "4px" }} /> View Order
          </span>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={10} className="mt-4 shadow">
            <h2 className="py-2 text-center">
              <FaShoppingCart size={30} style={{ marginBottom: "4px" }} />{" "}
              Orders
            </h2>
            <Table
              responsive
              striped
              bordered
              hover
              className="mt-2 mb-5 text-center align-middle"
            >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <Pagination
                  data={orders}
                  RenderComponent={TableRow}
                  pageLimit={1}
                  dataLimit={10}
                  tablePagination={true}
                />
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal show={show} animation onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
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
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrdersPage;
