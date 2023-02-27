import React from "react";
import { Table, Button, Container, Row, Col, NavItem } from "react-bootstrap";
import { FaLaptop, FaPlusCircle } from "react-icons/fa";
import { MdCreate, MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../utils/apiCalls";
import Pagination from "../Pagination/Pagination";
import "./admin.css";

function Products() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // removing the product
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  function handleDeleteProduct(id) {
    // logic here
    if (window.confirm("Are you sure?"))
      deleteProduct({
        product_id: id,
        user_id: user._id,
        userToken: user.token,
      });
  }

  function TableRow({ pictures, _id, name, price }) {
    return (
      <tr>
        <td>
          <img
            src={pictures[0].url}
            className="dashboard-product-preview"
            alt="productImage"
          />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <div className="d-flex gap-2 justify-content-center">
            <Link to={`/product/${_id}/edit`} className="btn btn-outline-dark">
              <MdCreate size={25} style={{ marginBottom: "4px" }} />
            </Link>
            <Button
              onClick={() => handleDeleteProduct(_id, user._id)}
              variant="danger"
              disabled={isLoading}
            >
              <MdDeleteForever size={25} style={{ marginBottom: "4px" }} />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={10} className="mt-4 shadow">
          <h2 className="py-2 text-center">
            <FaLaptop size={30} style={{ marginBottom: "4px" }} /> Products
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
                <th>Product ID</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <Pagination
                data={products}
                RenderComponent={TableRow}
                pageLimit={1}
                dataLimit={5}
                tablePagination={true}
              />
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
