import React from "react";
import Rlogo from "./Rlogo";
import { FaCheck } from "react-icons/fa";
import "./banner.css";
function Banner() {
  return (
    <div className="container-lg bg-dark" style={{ padding: "6%" }}>
      <div className="row">
        <div className="col-sm-6 d-flex justify-content-end align-items-center ">
          <Rlogo></Rlogo>
        </div>
        <div className="col-sm-6 text-white d-flex justify-content-start align-items-center">
          <div>
            <div className="listItems">
              <FaCheck color="green" /> Best quality .
            </div>
            <div className="listItems">
              <FaCheck color="green" /> Compare and order .
            </div>
            <div className="listItems">
              <FaCheck color="green" /> Always the best deal .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Banner;
