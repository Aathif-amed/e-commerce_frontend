import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./similarProduct.css";

function SimilarProduct({ _id, name, category, pictures, price }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
    >
      <Card
        className="product_container"
        style={{ width: "20rem", margin: "10px" }}
      >
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={pictures[0].url}
          style={{ height: "150px", objectFit: "contain" }}
        />
        <Card.Body className="text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <b>Price: </b>₹{price}.
          </Card.Text>
          <Badge bg="warning" text="dark">
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default SimilarProduct;
