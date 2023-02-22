import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineForward } from "react-icons/ai";
import "./home.css";
import { Col, Row } from "react-bootstrap";
import categories from "../../components/Categories";
import { LinkContainer } from "react-router-bootstrap";
function Home() {
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dgrkhvtdv/image/upload/v1675183350/ecom_imgs/homeBanner_vhbbex.jpg"
        alt="banner"
        className="home_banner"
      />
      <div className="featured_product_container container mt-4">
        <h2>Last Products</h2>
        <div className="div">
          <Link to="/category/all" className="allCategoryLink">
            See More
            <AiOutlineForward />{" "}
          </Link>
        </div>
      </div>
      <div className="sale_banner mt-4">
        <img
          src="https://res.cloudinary.com/dgrkhvtdv/image/upload/v1675180027/ecom_imgs/saleBanner_hnyzsy.jpg"
          alt="banner"
        />
      </div>
      <div className="react_products_container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => {
            return (
              <LinkContainer
                to={`/category/${category.name.toLocaleLowerCase()}`}
              >
                <Col md={4}>
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
