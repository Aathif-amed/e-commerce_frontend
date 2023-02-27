import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import api from "../../utils/api";
import "./categoryPage.css";
function CategoryPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setLoading(true);
    api
      .get(`/product/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function ProductSearch({ _id, category, name, pictures, price }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
        price={price}
      />
    );
  }

  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">{category.toUpperCase()}</h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input
          className="searchBox"
          type="search"
          placeholder={"🔍 Seacrh Products"}
          onChange={(error) => setSearchTerm(error.target.value)}
        />
      </div>
      {productsSearch.length === 0 ? (
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2rem",
          }}
          className="text-danger"
        >
          <HiOutlineEmojiSad />
          Oops! No Product Found.
        </h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={1}
                dataLimit={5}
                tablePagination={false}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default CategoryPage;
