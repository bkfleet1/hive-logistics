import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_APIARY } from "../utils/mutations";
import Auth from "../utils/auth";

const Apiary = () => {
  // set initial form state
  const [apiaryFormData, setApiaryFormData] = useState({
    name: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  //  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  //  const [addApiary, { error }] = useMutation(ADD_APIARY);
  const [addApiary, { data, loading, error }] = useMutation(ADD_APIARY);
  console.log(addApiary);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApiaryFormData({ ...apiaryFormData, [name]: value });
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
      console.log(apiaryFormData);
      const { data } = await addApiary({
        // addApiary({
        // variables: {name:apiaryFormData }
        //  variables: { ...apiaryFormData }
        variables: { apiaryData: { ...apiaryFormData } },
      });
    } catch (e) {
      console.error(e);
    }
    setApiaryFormData({
      //  apiaryFormData
      name: "",
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
          {error && <br>Added Apiary Failed.</br>}
        </Alert>

        <Form.Group>
          <h1>Apiary's Page</h1>
          <Form.Label htmlFor="name:">Name:</Form.Label>
          <Form.Control
            type="input"
            placeholder="Name"
            name="name"
            onChange={handleInputChange}
            value={apiaryFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button disabled={!apiaryFormData.name} type="submit" variant="success">
          Add
        </Button>
      </Form>
    </>
  );
};

export default Apiary;
