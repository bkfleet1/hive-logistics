const cors = require("cors");
const express = require("express");

const stripe = require("stripe")(
  "sk_test_51KpWTiJ3LESCIMvijwcmysYeM7yqLVckITjtx1bZAXYQ2Mwi0bXWwhES2L4eZWgOtk7cschJzuxK0CCiHPnTrCbZ00yy160RUa"
);

const { v4: uuidv4 } = require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("ITS WORKS ");
});

app.post("/checkout", (req, res) => {
  const { amount, token } = req.body;
  console.log("AMOUNT ", amount);

  const idKey = uuidv4();

  stripe.checkout.sessions.create({
    success: "http://localhost:3000/success",
    cancel: "https://localhost:3000/cancel",
    paymentType: ["card"],
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
           email: 'mssjhu9@gmail.com',
          amount: amount * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
        },
        { idKey }
      );
       console.log(customer);
        console.log(email);
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(8282, () => console.log("LISTENING AT PORT 8282"));
