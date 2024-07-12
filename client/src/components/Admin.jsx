import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { ADD_EVENT, ADD_PRODUCT } from '../utils/mutations';
import { UploadOutlined } from '@ant-design/icons';

const Admin = () => {
  const [formEvent] = Form.useForm();
  const [formProduct] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [addEvent] = useMutation(ADD_EVENT);
  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleFinishEvent = async (values) => {
    try {
      await addEvent({ variables: values });
      message.success('Event added successfully!');
      formEvent.resetFields();
    } catch (error) {
      message.error('Failed to add event');
    }
  };

  const handleFinishPost = async (values) => {
    console.log('Product form values before mutation:', values);
    console.log('Image URL:', imageUrl);
    try {
      const productValues = { ...values, price: parseFloat(values.price), image: imageUrl };
      const response = await addProduct({ variables: productValues });
      console.log('Product mutation response:', response);
      message.success('Product added successfully!');
      formProduct.resetFields();
      setImageUrl('');
    } catch (error) {
      message.error('Failed to add product');
      console.error('Failed to add product:', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        })
      }
    }
  };

  const handleImageUpload = () => {
    if (window.cloudinary && window.cloudinary.createUploadWidget) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          sources: ['local', 'url', 'camera', 'dropbox'],
          multiple: true,
          defaultSource: 'local',
          resourceType: 'image',
          cropping: 'true',
          croppingAspectRatio: 1,
          croppingShowDimensions: true,
          showSkipCropButton: false,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Uploaded image info:', result.info);
            setImageUrl(result.info.secure_url);
          } else if (error) {
            console.error('Error during upload:', error);
          }
        }
      );
      myWidget.open();
    } else {
      console.error('Cloudinary widget not loaded');
    }
  };

  return (
    <Row gutter={[16, 16]} style={{ width: '100%', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
      {/* Form for adding a new Event */}
      <Col span={11} style={{ padding: '0px 15px', backgroundColor: 'white', borderRadius: '10px'}}>
          <h1 style={{ textAlign: 'center', color: 'black', paddingTop: '20px' }}>Add Event</h1>
          <Form form={formEvent} onFinish={handleFinishEvent} layout="vertical">
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
              <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">Add Event</Button>
            </Form.Item>
          </Form>
      </Col>

      {/* Form for adding a new Product */}
      <Col span={11} style={{ padding: '0px 15px', backgroundColor: 'white', borderRadius: '10px', marginLeft: '10px'}}>
          <h1 style={{ textAlign: 'center', color: 'black', paddingTop: '20px' }}>Add Product</h1>
          <Form form={formProduct} onFinish={handleFinishPost} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter a price for the product' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
              <Input.TextArea rows={5} />
            </Form.Item>
            <Button icon={<UploadOutlined />} style={{ display: 'flex', margin: '0 auto' }} name="image" label="Image" onClick={handleImageUpload} rules={[{ required: true, message: 'Please upload an image' }]}>Upload Product Image
            </Button>
            <Form.Item style={{ textAlign: 'center', marginTop: '15px'}}>
              <Button type="primary" htmlType="submit">Add Product</Button>
            </Form.Item>
          </Form>
      </Col>
    </Row>
  );
};

export default Admin;
