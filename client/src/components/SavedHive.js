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
import { REMOVE_HIVE } from "../utils/mutations";
import { removeHiveId } from "../utils/localStorage";
import Auth from "../utils/auth";

const SavedHive = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeHive, { error }] = useMutation(REMOVE_HIVE);


  const userData = data?.me || {};

  // create function that accepts the apiary's _id value as param and deletes  from the database
  const handleDeleteHive = async (_id) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeHive({
        variables: { _id },
      });

      // upon success, remove apiary's id from localStorage
      removeHiveId(_id);
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
      <Container>
        <title> Hive </title>
        <CardColumns>
          {userData.savedApiary?.map((hive) => {
            return (
              <Card key={hive._id} border="dark">
                <Card.Body>
                  <Card.Title>{hive.name}</Card.Title>
                  <p className="small">Name: {hive.name}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteHive(hive._id)}
                  >
                    Delete this Hive!
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

export default SavedHive;
