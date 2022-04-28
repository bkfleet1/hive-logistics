import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_APIARY } from "../utils/mutations";
// import Auth from "../utils/auth";

const Apiary = () => {
  // set initial form state
  const [apiaryFormData, setApiaryFormData] = useState({
    name: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addApiary, { error }] = useMutation(ADD_APIARY);
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
      console.log( apiaryFormData );
      addApiary({
        variables: { ...apiaryFormData }
        
      });
      setApiaryFormData({
       name: ""
     
      });
      //Auth.login(data.addApiary.token);
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
          {error && <br>Added Apiary Failed.</br>}
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter apiary name"
            name="name"
            onChange={handleInputChange}
            value={apiaryFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="success">
          Add
        </Button>
      </Form>
    </>
  );
};

export default Apiary;
