import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./productPreview.css";

function ProductPreview({ _id, category, name, pictures, price }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={pictures[0].url}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <Card.Body className="text-center">
          <Card.Title className="text-capitalize">{name}</Card.Title>
          <Card.Text>
            <b>Price: </b>₹{price}.
          </Card.Text>
          <Badge bg="secondary">{category}</Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
