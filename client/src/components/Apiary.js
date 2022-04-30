import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_APIARY } from "../utils/mutations";
import { QUERY_APIARIES, QUERY_ME } from '../utils/queries';

import Auth from "../utils/auth";

const Apiary = () => {
const [apiaryFormData, setApiaryFormData] = useState({name: ""});
const [addApiary, { error }] = useMutation(ADD_APIARY, {
    update(cache, { data: { addApiary } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { apiary } = cache.readQuery({ query: QUERY_APIARIES });
        cache.writeQuery({
          query: ADD_APIARY,
          data: { apiary: [addApiary, ...apiary] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, apiary: [...me.apiary, addApiary] } },
      });
    },
  });


  const handleInputChange = (event) => {
    setApiaryFormData(event.target.value);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addApiary({
        variables: { apiaryFormData },
      });                                                                                 
      setApiaryFormData({name: ""});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>

        <h1>Apiary's Page</h1>
        <input
          type="input"
          placeholder="Enter apiary name"
          name="name"
          onChange={handleInputChange}
          value={apiaryFormData}
        />
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default Apiary;
