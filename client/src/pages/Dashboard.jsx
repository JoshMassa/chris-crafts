import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, Form } from "react-router-dom";
import { UPDATE_USER } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import AuthService from "../utils/auth";
import Admin from "../components/Admin.jsx";

const { Content } = Layout;
const { Text } = Typography;

function Dashboard() {
  const decoded = AuthService.getProfile();
  const userId = decoded._id;
  const usernames = decoded.username;
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (decoded && !hasRedirected) {
      navigate(`/user/${usernames}`);
      setHasRedirected(true);
    }
  }, [navigate, decoded, hasRedirected, usernames]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });
  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      setFirstName(data.user.firstName || "");
      setLastName(data.user.lastName || "");
      setCity(data.user.city || "");
      setState(data.user.state || "");
      setCountry(data.user.country || "");
      setIsAdmin(data.user.isAdmin || false);
    }
  }, [data, userId]);

  const handleSave = async () => {
    const updatedUserData = {
      firstName,
      lastName,
      city,
      state,
      country,
      isAdmin,
    };

    console.log("User information saved:", updatedUserData);

    try {
      const { data } = await updateUser({
        variables: {
          id: userId,
          input: updatedUserData,
        },
      });

      if (data && data.updateUser) {
        console.log("Updated user data:", data.updateUser);
        setFirstName(data.updateUser.firstName || "");
        setLastName(data.updateUser.lastName || "");
        setCity(data.updateUser.city || "");
        setState(data.updateUser.state || "");
        setCountry(data.updateUser.country || "");
        setIsAdmin(data.updateUser.isAdmin || false);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const formatAddress = (city, state, country) => {
    let address = "";
    if (city) address += city;
    if (state) address += city ? `, ${state}` : state;
    if (country) address += city || state ? ` - ${country}` : country;
    return address;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <div className="container-fluid" style={{ width: "100%" }}>
          <Row gutter={[16, 16]} justify="space-around">
            <Col span={16}>
              <Card
                className="card-profile shadow"
                style={{ borderRadius: "10px", border: "1px solid black" }}
              >
                <Col style={{ textAlign: "center" }}>
                  <Text
                    className="centered"
                    style={{ fontSize: "30px", padding: "24px" }}
                  >
                    {firstName} {lastName}
                  </Text>
                </Col>
                <Card.Meta
                  description={
                    <Col className="" style={{ textAlign: "center" }}>
                      <Col className="">
                        <Text
                          className=""
                          style={{ fontWeight: "600", textAlign: "center" }}
                        >
                          📍 {formatAddress(city, state, country)}{" "}
                        </Text>
                      </Col>
                    </Col>
                  }
                />
              </Card>

              <Card
                title="My account"
                className=""
                bordered={false}
                extra={<Button onClick={handleSave}>Save</Button>}
                style={{ marginTop: "20px", border: "1px solid black" }}
              >
                <Form>
                  <Text className="heading-small text-muted mb-4 h6">
                    User information
                  </Text>
                  <Col className="">
                    <Row gutter={[16, 16]}>
                      <Col lg={12} xs={12}>
                        <Col className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            id="input-first-name"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Col>
                      </Col>
                      <Col lg={12} xs={12}>
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            id="input-last-name"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <hr
                    className="my-4"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  />
                  <Text className="heading-small text-muted mb-4 h6">
                    Location
                  </Text>
                  <div className="pl-lg-4">
                    <Row gutter={[16, 16]}>
                      <Col lg={8} xs={24}>
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            id="input-city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={8} xs={24}>
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-state"
                          >
                            State
                          </label>
                          <Input
                            id="input-state"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col lg={8} xs={24}>
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            id="input-country"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card>
            </Col>
            {isAdmin && <Admin />}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default Dashboard;
