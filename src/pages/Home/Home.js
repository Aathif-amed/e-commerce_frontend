import { Link } from "react-router-dom";
import { AiOutlineForward } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React, { useEffect } from "react";
import categories from "../../components/Categories";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../slices/productSlice";
import "./home.css";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const latestProducts = products.slice(0, 8);
  useEffect(() => {
    api
      .get("/product")
      .then(({ data }) => dispatch(updateProducts(data)))
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <img
        src="https://res.cloudinary.com/amedstack/image/upload/v1677379694/ecomm/homeBanner_g8np4b.jpg"
        className="home_banner"
        alt="homeBanner"
      />
      <div className="featured_product_container container mt-4">
        <h2 className="text-center">Latest Products</h2>
        <div className="d-flex justify-content-center flex-wrap">
          {latestProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>

        <div className="div">
          <Link to="/category/all" className="allCategoryLink">
            See More
            <AiOutlineForward />{" "}
          </Link>
        </div>
      </div>
      <div className="sale_banner mt-4">
        <img
          src="https://res.cloudinary.com/amedstack/image/upload/v1677379694/ecomm/saleBanner_ll3wqb.jpg"
          alt="banner"
        />
      </div>
      <div className="react_products_container container mt-4">
        <h2 className="text-center">Categories</h2>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {categories.map((category) => {
            return (
              <LinkContainer
                to={`/category/${category.name.toLocaleLowerCase()}`}
              >
                <Col md={2}>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${category.img})`,
                      gap: "10px",
                    }}
                    className="categoriesDiv"
                  >
                    {category.name}
                  </div>
                </Col>
              </LinkContainer>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Home;
