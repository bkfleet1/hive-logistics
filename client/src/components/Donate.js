import React, { useState } from "react";
import "../App.css";
import StripeCheckout from "react-stripe-checkout";


function Donate() {
  var [amount, setAmount] = useState("");

  const pay = {
    border: "4px solid green",
    borderRadius: "5px",
    textAlign: "center",
    height: "45px",
    marginLeft: "0px",
    marginTop: "15px",
    display: "block",
    padding: "15px",
    fontFamily: "Times New Roman",
    fontSize: "14px",
    width: "100%",
  };

  const numberHandle = (event) => {
    setAmount(event.target.value);
  };
  const payment = (token) => {
    const body = {
      token,
      amount,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8282/checkout`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
    <div>
      <h1>Please Donate!</h1>
      <input
        onChange={numberHandle}
        style={pay}
        type="number"
        placeholder=" Enter the amount you wish to donate in $"
        value={amount}
      />
      <StripeCheckout
        stripeKey="pk_test_51KpWTiJ3LESCIMvinKVl2WL7VgEPOTAFndsTIs1hu3qLwD6J26kEuwAuO6ZZynOHUSdiAgt62MaXK6S9SbwPMHtx00WaibEBJL"
        //{process.env.REACT_APP_KEY}
        token={payment}
        name="Donate"
        amount={amount * 100}>
        <button
          style={{
            padding: "15px",
            backgroundColor: "green",
            color: "white",
            fontWeight: "500",
            cursor: "pointer",
            width: "500",
            border: "5px solid green",
            display: "flex",
            width: "100%",
          }}
        >
          DONATE
        </button>
      </StripeCheckout>
  </div>
  </>
  );
  };
export default Donate;
