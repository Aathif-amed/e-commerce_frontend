import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import Loading from "../Loading/Loading";
import "./admin.css";

function ClientPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const userToken = user.token;
  useEffect(() => {
    setLoading(true);
    api
      .get("/user", {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then(({ data }) => {
        setLoading(false);

        setUsers(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={10} className="mt-4 shadow">
          <h2 className="py-2 text-center">
            <FaUser size={30} style={{ marginBottom: "4px" }} /> Users
          </h2>
          <Table
            responsive
            striped
            bordered
            hover
            className="mt-2 mb-5 text-center align-middle"
          >
            <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientPage;
