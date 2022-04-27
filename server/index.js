const cors = require("cors");
const express = require("express");

const stripe = require("stripe")(
  "pk_test_51KpWTiJ3LESCIMvinKVl2WL7VgEPOTAFndsTIs1hu3qLwD6J26kEuwAuO6ZZynOHUSdiAgt62MaXK6S9SbwPMHtx00WaibEBJL"
);
const { v4: uuidv4 } = require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("IT WORKS ");
});

app.post("/checkout", (req, res) => {
  const { number, token } = req.body;
  console.log("AMOUNT ", number);

  const idempontencyKey = uuidv4();

  stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    cancel_url: "https://localhost:3000/cancel",
    payment_method_types: ["card"],
    mode: "payment",
  });

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: number * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(8282, () => console.log("LISTENING AT PORT 8282"));
