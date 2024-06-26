import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Card, Row, Col, Typography, Divider } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate, Form } from 'react-router-dom';
import { UPDATE_USER } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import AuthService from '../utils/auth';
import Admin from '../components/Admin.jsx';

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

  const currentUser = AuthService.getProfile();
  console.log('userId:', userId);
  console.log('currentUser:', currentUser);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data, loading, error } = useQuery(GET_USER, { variables: { id: userId } });
  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      setFirstName(data.user.firstName || '');
      setLastName(data.user.lastName || '');
      setCity(data.user.city || '');
      setState(data.user.state || '');
      setCountry(data.user.country || '');
      setIsAdmin(data.user.isAdmin || false);
    }
  }, [data, currentUser._id]);
  
  const handleSave = async () => {
    const updatedUserData = {
      firstName,
      lastName,
      city,
      state,
      country,
    };
    
    console.log('User information saved:', updatedUserData);

    try {
      const { data } = await updateUser({
        variables: {
          id: userId,
          input: updatedUserData,
        },
      });

      if (data && data.updateUser) {
        setFirstName(data.updateUser.firstName || '');
        setLastName(data.updateUser.lastName || '');
        setCity(data.updateUser.city || '');
        setState(data.updateUser.state || '');
        setCountry(data.updateUser.country || '');
        setIsAdmin(data.updateUser.isAdmin || false);
      }
      console.log('user data to save:', data)
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        <div>
          <Row gutter={[16, 16]} justify='center'>
            <Col span={14}>
              <Card
                className="card-profile shadow"
                style={{ borderRadius: '10px' }}
              >
                <Col style={{textAlign: 'center'}}>
                    <Text className="centered" style={{ fontSize: '30px', padding: '24px' }}>{firstName} {lastName}</Text>
                  </Col>
                <Card.Meta
                  description={
                    <Col className="" style={{textAlign: 'center'}}>
                      <Col className="">
                        <Text className=""style={{fontWeight: '600', textAlign: 'center'}}>📍 {city} {state} {country} </Text>
                      </Col>
                    </Col>
                  }
                />
              </Card>
            </Col>
            
            <Row gutter={[16, 16]} justify="space-around">
            <Col xl={22} md={24}>
              <Card
                title="My account"
                className=""
                bordered={false}
                extra={<Button onClick={handleSave}>Save</Button>}
              >
                <Form>
                  <Text className="heading-small text-muted mb-4 h6">User information</Text>
                  <Col className="">
                    <Row gutter={[16, 16]}>
                      <Col lg={12} xs={12}>
                        <Col className="form-group focused">
                          <label className="form-control-label" htmlFor="input-first-name">First name</label>
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
                          <label className="form-control-label" htmlFor="input-last-name">Last name</label>
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
                  <hr className="my-4" style={{marginTop: '20px', marginBottom: '20px'}} />
                  <Text className="heading-small text-muted mb-4 h6">Location</Text>
                  <div className="pl-lg-4">
                    <Row gutter={[16, 16]}>
                      <Col lg={8} xs={24}>
                        <div className="form-group focused">
                          <label className="form-control-label" htmlFor="input-city">City</label>
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
                          <label className="form-control-label" htmlFor="input-state">State</label>
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
                          <label className="form-control-label" htmlFor="input-country">Country</label>
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
            </Row>
          {isAdmin && (
            <Col xl={10} md={24}>
              <Card>
                <Admin />
              </Card>
            </Col>
          )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default Dashboard;