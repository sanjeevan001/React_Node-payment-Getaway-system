const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51NRVxgSF0xenZkJMM39rb2I9UsXpMsWlpPBFQQkHuUFDEvvOPWqy5RjXByGXkmG1FHULzefUqIP1jQMQCtyDyuel00DK2lytxw"
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Data");
});

app.post("/payment", (req, res) => {
  console.log(req.body);
  res.send("working ppropeley");
  const { product, token } = req.body;
  const transationkey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create({
          amount: product.price,
          cuurrency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => console.log(err));
    });
});

app.listen(5000, () => {
  console.log("Server is up and running");
});
