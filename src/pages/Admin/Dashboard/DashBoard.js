import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import ClientPage from "../../../components/AdminComponents/ClientPage";
import OrdersPage from "../../../components/AdminComponents/OrdersPage";
import Products from "../../../components/AdminComponents/Products";
import CreateProduct from "../CreateProduct/CreateProduct";
import "./dashboard.css";
function DashBoard() {
  return (
    <Container className="my-5">
      <Tabs
        defaultActiveKey="products"
        id="fill-tab-example dash"
        className="mb-3"
        fill
      >
        <Tab eventKey="products" title="💻 Products" id="dash">
          <Products />
        </Tab>
        <Tab eventKey="orders" title="🛒 Orders" id="dash">
          <OrdersPage />
        </Tab>
        <Tab eventKey="users" title="👤 Users" id="dash">
          <ClientPage />
        </Tab>
        <Tab eventKey="create" title="➕ Add Product" id="dash">
          <CreateProduct />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default DashBoard;
