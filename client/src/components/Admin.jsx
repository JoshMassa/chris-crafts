import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';
import { ADD_EVENT } from '../utils/mutations'

const Admin = () => {
  const [form] = Form.useForm();
  const [addEvent] = useMutation(ADD_EVENT);

  const handleFinish = async (values) => {
    try {
      await addEvent({ variables: values });
      message.success('Event added successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add event');
    }
  };

  return (
    <div style={{ maxWidth: '500px', height: 'auto', margin: '0 auto', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1 style={{textAlign: 'center', color: 'black', paddingTop: '20px'}}>Add Event</h1>
    <Form form={form} onFinish={handleFinish} layout="vertical" style={{width: '75%'}}>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please enter the date' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter the event location' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="time" label="Time" rules={[{ required: true, message: 'Please enter a time frame for the event' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
        <Input.TextArea 
        rows={5}
        />
      </Form.Item>
      <Form.Item style={{textAlign: 'center'}}>
        <Button type="primary" htmlType="submit">Add Event</Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Admin;