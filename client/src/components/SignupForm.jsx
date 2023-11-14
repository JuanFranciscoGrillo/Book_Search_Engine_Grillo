// SignupForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // ... useState declarations ...

  const [addUser, { error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      Auth.login(data.addUser.token);
    },
    onError: (err) => {
      console.error(err);
      setShowAlert(true);
    }
  });

  // ... Event handlers ...

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* ... Form content ... */}
      </Form>
    </>
  );
};

export default SignupForm;
