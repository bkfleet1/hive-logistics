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

const SavedApiary = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeApiary, { error }] = useMutation(REMOVE_APIARY);

  const userData = data?.me || {};

  // create function that accepts the apiary's _id value as param and deletes the book from the database
  const handleDeleteApiary = async (apiaryId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeApiary({
        variables: { apiaryId },
      });

      // upon success, remove apiary's id from localStorage
      removeApiaryId(apiaryId);
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
          <h1>Viewing {userData.userapiaryId}'s Apiary!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedApiary?.length
            ? `Viewing ${userData.savedApiary.length} saved ${
                userData.savedApiary.length === 1 ? "apiary" : "apiary"
              }:`
            : "You have no saved apiary!"}
        </h2>
        <CardColumns>
          {userData.savedApiary?.map((apiary) => {
            return (
              <Card key={apiary.apiaryId} border="dark">
                {/* {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${apiary.apiaryId}`} variant='top' />
                ) : null} */}
                <Card.Body>
                  <Card.Title>{apiary.name}</Card.Title>
                  <p className="small">Name: {apiary.name}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteApiary(apiary.apiaryId)}
                  >
                    Delete this apiary!
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
