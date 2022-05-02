import React from "react";
import Jumbotron from "./Jumbotron";
export default function Success() {
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your donation!</h2>
        <h2>You will now be redirected to the main page</h2>
      </Jumbotron>
    </div>
  );
}
