import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    fName: "",
    lName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      fName: "",
      lName: "",
      username: "",
      email: "",
      password: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          {error && <br>Sign-up failed.</br>}
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="fName">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your First Name"
            name="fName"
            onChange={handleInputChange}
            value={userFormData.fName}
            required
          />
          {/* <Form.Control.Feedback type="invalid">
            First Name is required!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="lName">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Last Name"
            name="lName"
            onChange={handleInputChange}
            value={userFormData.lName}
            required
          />
          {/* <Form.Control.Feedback type="invalid">
            First Name is required!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="address">Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Your Address"
            name="address"
            onChange={handleInputChange}
            value={userFormData.address}
            required
          />

          {/* <Form.Control.Feedback type="invalid">
            Address is required!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="city">City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your City"
            name="city"
            onChange={handleInputChange}
            value={userFormData.city}
            required
          />
          {/* 
          <Form.Control.Feedback type="invalid">
            City is required!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="state">State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your State"
            name="state"
            onChange={handleInputChange}
            value={userFormData.state}
            required
          />

          {/* <Form.Control.Feedback type="invalid">
            State is required!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="zipCode">Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Postal Code"
            name="zipCode"
            onChange={handleInputChange}
            value={userFormData.zipCode}
            required
          />

          {/* <Form.Control.Feedback type="invalid">
            Postal Code is required!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Button
          disabled={
            !(
              //userFormData.fName &&
              //userFormData.lName &&
              userFormData.email &&
              userFormData.username &&
              userFormData.password 
             // userFormData.address &&
             // userFormData.city &&
             // userFormData.state &&
              //userFormData.zipCode
            )
          }
          type="submit"
          variant="success"
        >
          Signup
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
