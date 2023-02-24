import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { IoCreate } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../utils/apiCalls";
import fetch from "../../utils/fetch";
import "./createProduct.css";
import { useSelector } from "react-redux";

function CreateProduct() {
  const user = useSelector((state) => state.user);
  console.log(user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    fetch
      .delete(`/api/images/${imgObj.public_id}`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    console.log(user);
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
    }
    createProduct({
      product: { name, description, price, category, images },
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
        cloudName: "amedstack",
        uploadPreset: "amedpreset",
        sources: ["local", "url"],
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
    <Container className="createProduct_container">
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4 text-center">
              <IoCreate style={{ marginBottom: "10px" }} />
              Create Product
            </h1>
            {isSuccess && (
              <Alert variant="success">Product created with succcess</Alert>
            )}
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
              <Form.Select>
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
                Upload Images
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || isSuccess || images.length === 0}
              >
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default CreateProduct;
