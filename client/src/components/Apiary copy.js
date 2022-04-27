import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_APIARY } from "../utils/mutations";
import Auth from "../utils/auth";
import { saveApiaryIds, getSavedApiaryIds } from "../utils/localStorage";

const addApiary = () => {
  // create state for holding returned data
  const [addApiary, setApiary] = useState([]);
  // create state for holding our search field data
  const [addInput, setApiaryInput] = useState("");

  // create state to hold saved apiaryId values
  const [savedApiaryIds, setSavedApiaryIds] = useState(getSavedApiaryIds());
  const [addApiary, { error }] = useMutation(SAVE_APIARY);

  // set up useEffect hook to save `savedapiaryIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveApiaryIds(savedApiaryIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!addInput) {
      return false;
    }

    const { items } = await response.json();

    const apiaryData = items.map((apiary) => ({
      apiaryId: book.id,
      name: apiary.name,
    }));

    setSavedApiaryIds(apiaryData);
    setAddInput("");
  };

  // create function to handle saving a apiary to our database
  const handleSaveApiary = async (apiaryId) => {
    // find the apiary in `addedApiary` state by the matching id
    const apiaryToSave = saveApiary.find(
      (apiary) => apiary.apiaryId === apiaryId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await addApiary({
        variables: { apiaryData: { ...apiaryToSave } },
      });
      console.log(savedApiaryIds);

      setSavedApiaryIds([...savedApiaryIds, apiaryToSave.apiaryId]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Add Apiary!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="addInput"
                  value={searchInput}
                  onChange={(e) => setAddInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Add a Apiary"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Save
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {savedApiary.length
            ? `Viewing ${addedApiary.length} results:`
            : "Added for a Apiary to begin"}
        </h2>
        <CardColumns>
          {savedApiary.map((book) => {
            return (
              <Card key={apiary.apiaryId} border="dark">
                <Card.Body>
                  <Card.Title>{apiary.name}</Card.Title>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedApiaryIds?.some(
                        (savedId) => savedId === apiary.apiaryId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveApiary(apiary.apiaryId)}
                    >
                      {savedApiaryIds?.some(
                        (savedId) => savedId === apiary.apiaryId
                      )
                        ? "Apiary Already Saved!"
                        : "Save This Apiary!"}
                    </Button>
                  )}
                  {error && (
                    <span className="ml-2">Something went wrong...</span>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default saveApiary;
