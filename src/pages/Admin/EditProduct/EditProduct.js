import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../../../utils/apiCalls";
import api from "../../../utils/api";
import "./editProduct.css";
import { IoCreate } from "react-icons/io5";
import { FaCloudUploadAlt, FaSave, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    api
      .get("/product/" + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setImages(product.pictures);
        setPrice(product.price);
      })
      .catch((error) => {
        alert(error.message);
        return console.log(error);
      });
  }, [id]);

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    api
      .delete(`/images/${imgObj.public_id}`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((error) => {
        alert(error.message);
        return console.log(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }
    updateProduct({
      product: { id, name, description, price, category, images },
      userToken: user.token,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUD_PRESET,
        sources: ["local", "url", "unsplash"],
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4 text-center">
              <IoCreate style={{ marginBottom: "10px" }} />
              Edit Product
            </h1>
            {isSuccess && <Alert variant="success">Product Updated..!</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (₹)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select value={category}>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="tablets">Tablet</option>
                <option value="phones">Phone</option>
                <option value="laptops">Laptop</option>
                <option value="cameras">Camera</option>
                <option value="watches">Watch</option>
              </Form.Select>
            </Form.Group>

            <div className="images-preview-container">
              {images.map((image) => (
                <div className="image-preview">
                  <img src={image.url} alt="ai" />
                  {imgToRemove !== image.public_id && (
                    <FaTimesCircle
                      className="icon"
                      onClick={() => handleRemoveImg(image)}
                    />
                  )}
                </div>
              ))}
            </div>
            <Form.Group className="d-flex justify-content-center gap-2 mb-4">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={showWidget}
              >
                <FaCloudUploadAlt size={20} style={{ marginBottom: "6px" }} />{" "}
                Upload Images
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || isSuccess || images.length === 0}
              >
                <FaSave size={20} style={{ marginBottom: "6px" }} /> Save
                Changes
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default EditProduct;
