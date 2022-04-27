import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_BEEFEEDER } from "../utils/mutations";
import Auth from "../utils/auth";

const BeeFeeder = () => {
  // set initial form state
  const [beeFeederFormData, setBeeFeederFormData] = useState({
    name: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addBeeFeeder, { data, loading, error }] = useMutation(ADD_BEEFEEDER);
  // console.log(addBeeFeeder);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBeeFeederFormData({ ...beeFeederFormData, [name]: value });
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
      console.log(beeFeederFormData);
      addBeeFeeder({
        variables: { name: beeFeederFormData },
      });
      setBeeFeederFormData({
        beeFeederFormData,
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
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name:"
            name="name"
            onChange={handleInputChange}
            value={beeFeederFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <div class="form-group">
            <label class="control-label" for="BeeBreed">
              beeBreed
            </label>
            <select id="BeeBreed" class="form-control" name="BeeBreed">
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="name">AcquisitionSource</Form.Label>
          type="text" placeholder="AcquisitionSource:" name="acquisitionSource"
          onChange={handleInputChange}
          value={beeFeederFormData.acquisitionSource}
          required
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="name">AcquisitionDate</Form.Label>
          type="date" placeholder="AcquisitionDate:" name="acquisitionDate"
          onChange={handleInputChange}
          value={beeFeederFormData.acquisitionDate}
          required
        </Form.Group>
      </Form>
    </>
  );
};

export default BeeFeeder;
