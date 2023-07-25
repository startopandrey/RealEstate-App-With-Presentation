module.exports.payRequest = (request, response, stripeClient) => {
  const body = JSON.parse(request.body);
  const { token, amount } = body;
  stripeClient.paymentIntents
    .create({
      amount: amount,
      currency: "EUR",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token: token,
        },
      },

      confirm: true,
    })
    .then((paymentIntent) => {
      console.log(paymentIntent);
      response.json(paymentIntent);
    })
    .catch((err) => {
      response.status(400);
      response.send(err);
    });
  response.send(request.body);
};
