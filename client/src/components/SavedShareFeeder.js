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
import { REMOVE_SHAREFEEDER } from "../utils/mutations";
// import { removeShareFeederId } from "../utils/localStorage";
import Auth from "../utils/auth";

const SavedShareFeeder = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeShareFeeder, { error }] = useMutation(REMOVE_SHAREFEEDER);

  const userData = data?.me || {};

  // create function that accepts the apiary's _id value as param and deletes  from the database
  const handleDeleteShareFeeder = async (_id) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // try {
    //   await removeShareFeeder({
    //     variables: { _id },
    //   });

    //   // upon success, remove apiary's id from localStorage
    //   removeShareFeederId(_id);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(userData.username);
  return (
    <>
      <Container>
        <title> ShareFeeder </title>
        <CardColumns>
          {userData.savedApiary?.map((ShareFeeder) => {
            return (
              <Card key={ShareFeeder._id} border="dark">
                <Card.Body>
                  <Card.Title>{ShareFeeder.name}</Card.Title>
                  <p className="small">Name: {ShareFeeder.name}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteShareFeeder(ShareFeeder._id)}
                  >
                    Delete this ShareFeeder!
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

export default SavedShareFeeder;
