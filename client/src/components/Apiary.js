import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_APIARY } from "../utils/mutations";
import Auth from "../utils/auth";

const Apiary = () => {
  // set initial form state
  const [apiaryFormData, setApiaryFormData] = useState({
    name: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [saveApiary, { error }] = useMutation(SAVE_APIARY);

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

    try {
      const { data } = await saveApiary({
        variables: { ...apiaryFormData },
      });
      Auth.login(data.saveApiary.token);
    } catch (e) {
      console.error(e);
    }

    setApiaryFormData({
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
          {error && <br> Login failed.</br>}
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="name">Apiary</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name:"
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
