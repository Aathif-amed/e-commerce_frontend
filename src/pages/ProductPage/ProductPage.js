import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../../utils/apiCalls";
import { MdEdit, MdOutlineAddShoppingCart } from "react-icons/md";
import api from "../../utils/api";
import Loading from "../../components/Loading/Loading";
import SimilarProduct from "../../components/SimilarProduct/SimilarProduct";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import "./productPage.css";

function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
    api.get(`/product/${id}`).then(({ data }) => {
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
      alt="productImage"
    />
  ));

  let similarProducts = [];
  if (similar) {
    similarProducts = similar.map((product, index) => (
      <div className="item" data-value={index}>
        <SimilarProduct {...product} />
      </div>
    ));
  }
  console.log(product);

  return (
    <>
      <Container className="pt-4" style={{ position: "relative" }}>
        <Row className="pt-4 productPage_container">
          <Col lg={6} className="pb-0">
            <AliceCarousel
              mouseTracking
              items={images}
              controlsStrategy="alternate"
            />
          </Col>
          <Col lg={6} className="pt-4">
            <h1 className="mb-3">{product.name}</h1>
            <p>
              <b>Category: </b>
              <Badge bg="primary">{product.category}</Badge>
            </p>
            <p className="product__price">
              <b>Price: </b>₹{product.price}
            </p>
            <p className="mb-4 product_description">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-center">
              {user && !user.isAdmin && (
                <Button
                  size="lg"
                  variant="dark"
                  className="mb-3"
                  onClick={() =>
                    addToCart({
                      cartInfo: {
                        userId: user._id,
                        productId: id,
                        price: product.price,
                        image: product.pictures[0].url,
                      },
                      userToken: user.token,
                    })
                  }
                >
                  <MdOutlineAddShoppingCart /> Add to cart
                </Button>
              )}
              {user && user.isAdmin && (
                <LinkContainer to={`/product/${product._id}/edit`}>
                  <Button size="lg" variant="info" className="mb-1 text-center">
                    <MdEdit /> Edit Product
                  </Button>
                </LinkContainer>
              )}
            </p>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h2 className="text-center">Similar Products</h2>

            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <AliceCarousel
                mouseTracking
                items={similarProducts}
                responsive={responsive}
                controlsStrategy="alternate"
              />
            </div>
          </Col>
        </Row>
      </Container>
      {isSuccess && (
        <ToastMessage
          bg="info"
          title="Added to cart"
          body={`${product.name} added to cart`}
        />
      )}
    </>
  );
}

export default ProductPage;
