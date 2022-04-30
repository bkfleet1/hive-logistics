import React, { useState } from "react";
//import { Dropdown, Option } from "./Dropdown";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_HIVE } from "../utils/mutations";
import Auth from "../utils/auth";

const Hive = () => {
  // set initial form state
  const [hiveFormData, setHiveFormData] = useState({
    name: "",
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addHive, { data, loading, error }] = useMutation(ADD_HIVE);
  // console.log(addHive);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setHiveFormData({ ...hiveFormData, [name]: value });
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
      console.log(hiveFormData);
      addHive({
        variables: { name: hiveFormData },
      });
      setHiveFormData({
        hiveFormData,
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
          {error && <br>Added Hive Failed.</br>}
        </Alert>

        <Form.Group>
         <h1>Hive's Section</h1>
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name:"
            name="name"
            onChange={handleInputChange}
            value={hiveFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group>
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
        </Form.Group> */}

        {/* <Dropdown action="/">
          <Option selected value="BeeBreed" />
          <Option value="Option 1" />
          <Option value="Option 2" />
          <Option value="Option 3" />
        </Dropdown> */}

        <Form.Group>
          <Form.Label htmlFor="name">AcquisitionSource</Form.Label>
          type="text" placeholder="AcquisitionSource:" name="acquisitionSource"
          onChange={handleInputChange}
          value={hiveFormData.acquisitionSource}
          required
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="name">AcquisitionDate</Form.Label>
          type="text" placeholder="AcquisitionDate:" name="acquisitionDate"
          onChange={handleInputChange}
          value={hiveFormData.acquisitionDate}
          required
        </Form.Group>
         <Button disabled={!hiveFormData.name} type="submit" variant="success">
          Add
        </Button>
      </Form>
    </>
  );
};

export default Hive;
