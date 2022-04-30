import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_FEEDER } from "../utils/mutations";
import Auth from "../utils/auth";

const ShareFeeder = () => {
  // set initial form state
  const [feederFormData, setFeederFormData] = useState({
    name: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addFeeder, { error }] = useMutation(ADD_FEEDER);
  // console.log(addFeeder);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFeederFormData({ ...feederFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    try {
      console.log(feederFormData);
      addFeeder({
        variables: { name: feederFormData },
      });
      setFeederFormData({
        feederFormData,
      });
    } catch (e) {
      console.error(e);
    }
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
          {error && <br>Added BeeBreed Failed.</br>}
        </Alert>

        <Form.Group>
         <h1>Share Feeders's Section</h1>
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name:"
            name="name"
            onChange={handleInputChange}
            value={feederFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>
        </Form.Group>
         <Button disabled={!feederFormData.name} type="submit" variant="success">
          Add
        </Button>
      </Form>
    </>
  );
};

export default ShareFeeder;
