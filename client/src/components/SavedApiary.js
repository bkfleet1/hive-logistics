import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_APIARY } from "../utils/mutations";
import { removeApiaryId } from "../utils/localStorage";
import Auth from "../utils/auth";
import SavedHive from "./SavedHive";
import SavedShareFeeder from "./SavedShareFeeder";

const SavedApiary = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeApiary, { error }] = useMutation(REMOVE_APIARY);

  const userData = data?.me || {};

  // create function that accepts the apiary's _id value as param and deletes  from the database
  const handleDeleteApiary = async (_id) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeApiary({
        variables: { _id },
      });

      // upon success, remove apiary's id from localStorage
      removeApiaryId(_id);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(userData.username);

  return (
    <>
      <h2>
        {userData.savedApiary?.length
          ? `Viewing ${userData.savedApiary.length} saved ${
              userData.savedApiary.length === 1 ? "apiary" : "apiaries"
            }:`
          : "You have no saved apiary!"}
      </h2>

      <Container>
        <Button variant="primary">Inspect</Button>{" "}
        <Button variant="secondary">Feed</Button>{" "}
        <Button variant="success">Treat</Button>{" "}
        <Button variant="warning">Re-Queen</Button>{" "}
        <Button variant="danger">Harvest</Button>{" "}
      </Container>

      <Container>
        <title> Apiary </title>
        <CardColumns>
          {userData.savedApiary?.map((Apiary) => {
            return (
              <Card key={Apiary._id} border="dark">
                <Card.Body>
                  <Card.Title>{Apiary.name}</Card.Title>
                  <p className="small">Name: {Apiary.name}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteApiary(Apiary._id)}
                  >
                    Delete this Apiary!
                  </Button>
                  {error && (
                    <span className="ml-2">Something went wrong...</span>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <SavedHive />
      <SavedShareFeeder />
    </>
  );
};

export default SavedApiary;
