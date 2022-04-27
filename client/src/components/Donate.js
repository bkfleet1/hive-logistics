import React, { useState } from "react";
import '../App.css';
import StripeCheckout from "react-stripe-checkout";


function Donate() {
  var [amount, setAmount] = useState("");

      const pay = {
        
        border: "4px solid Blue",
        borderRadius: "5px",
        textAlign:"center",
        height:"45px",
        marginLeft: "0px",
        marginTop:"15px",
        display: "block",
        padding: "15px" ,
        fontFamily: "Times New Roman",
        fontSize: "14px",
        width: "100%",
        
         
      }

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

    return fetch(`http://localhost:8080/checkout`, {
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
        <label>Donation:</label>
        <input
          onChange={numberHandle}
          style={pay}
          type="number"
          placeholder="Amount:$"
          value={amount}
        />
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={payment}
          name="Donate"
          amount={amount * 100}
        >
          <button className="btn-large ">Donate {amount}</button>
        </StripeCheckout>
      </div>
    </>
  );
}

export default Donate;
