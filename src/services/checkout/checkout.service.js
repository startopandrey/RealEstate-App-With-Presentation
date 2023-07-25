import createStripe from "stripe-client";
import { host } from "../../utils/env";
const stripe = createStripe(
  "pk_test_51MMeEbByhddnFBQYgeTmDWo6zPZqbiek75VzEzpEnACM6NSwKuzRfVxzVMCQQYfSk9c86JeUXOXJTdp5ZBxFRPkh00OLno7SAu"
);
export const cardTokenRequest = (card) => {
  return stripe.createToken({ card });
};
export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong");
    }
    return res.json();
  });
};
