// LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      Auth.login(data.loginUser.token);
    },
    onError: (err) => {
      console.error(err);
      setShowAlert(true);
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userFormData.email || !userFormData.password) {
      setShowAlert(true);
      return;
    }

    try {
      await loginUser({ variables: { ...userFormData } });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {showAlert && <Alert dismissible onClose={() => setShowAlert(false)} variant='danger'>
          {error ? error.message : 'Something went wrong with your login credentials!'}
        </Alert>}
        {/* ... rest of the form ... */}
      </Form>
    </>
  );
};

export default LoginForm;
