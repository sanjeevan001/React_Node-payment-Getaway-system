import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

import "./App.css";

const App = () => {
  const [product, setProduct] = useState({
    name: "apple mack book",
    price: (100 * 100) / 10,
    productby: "sanjee",
  });

  const makePayment = (token) => {
    const body = { token, product };

    // node connect

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:5000/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body), // Corrected: Invoke JSON.stringify with the body object
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Payment Gateway</h1>
      <StripeCheckout
        name="buy mac book pro"
        amount={product.price}
        currency="INR"
        stripeKey="pk_test_51NRVxgSF0xenZkJM3LfAeHePDZVhycMCpoy9H4ts0cVTcvALH7XINvs9EtHmb1ZLUMGhvkg5qmbWRqsCi0HVLkuw00uTW4Y4Bg"
        token={makePayment} // Corrected: Use makePayment function
      >
        <button>{product.price}</button>
      </StripeCheckout>
    </div>
  );
};

export default App;
