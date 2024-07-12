import React from 'react';
import { Layout, List, Typography, Card } from 'antd';
import '../styles/Events.css';
import { GET_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const { Sider } = Layout;
const { Title } = Typography;

const Events = () => {

  const { loading, error, data } = useQuery(GET_EVENTS);
  console.log('data:', data);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Sorts events by date in descending order
  const sortedEvents = [...data.events].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Sider width={300} className="aside">
      <Title level={3} className="aside-title">Upcoming Events</Title>
      <List
        itemLayout="horizontal"
        dataSource={sortedEvents}
        renderItem={item => (
          <List.Item>
            <Card className="event-card">
              <Title className="event-title" level={4}>{item.title}</Title>
              <p className="event-date">{item.date}</p>
              <p className="event-location">{item.location}</p>
              <p className="event-time">{item.time}</p>
              <p className="event-description">{item.description}</p>
            </Card>
          </List.Item>
        )}
      />
    </Sider>
  );
};

export default Events;
