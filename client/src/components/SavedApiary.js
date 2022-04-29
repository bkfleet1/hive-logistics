import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_APIARY} from "../utils/queries";
import { REMOVE_APIARY } from "../utils/mutations";
import { removeApiaryId } from "../utils/localStorage";
import Auth from "../utils/auth";

const SavedApiary = () => {
   const { loading, data } = useQuery(GET_ME);
  // const { loading, data } = useQuery(GET_APIARY);
  // const { data } = useQuery(QUERY_USER);
  //const { loading, data } = useQuery(QUERY_USER);
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

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s apiaries!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.Apiary?.length
            ? `Viewing ${userData.Apiary.length} saved ${
                userData.Apiary.length === 1 ? "apiary" : "apiaries"
              }:`
            : "You have no saved apiary!"}
        </h2>
        <CardColumns>
          {userData.Apiary?.map((apiary) => {
            return (
              <Card key={apiary._id} border="dark">
                <Card.Body>
                  <Card.Title>{apiary.name}</Card.Title>
                  <p className="small">Name: {apiary.name}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteApiary(apiary._id)}
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
    </>
  );
};

export default SavedApiary;
