import React from "react";
// import { LiteCreditCardInput } from "react-native-credit-card-input";
import { LiteCreditCardInput } from "react-native-credit-card-input-plus";
import { cardTokenRequest } from "@src/services/checkout/checkout.service";

export const CreditCardInput = ({ name = "Andrey", onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");

    const expiry = values.expiry.split("/");
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };

    if (!isIncomplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (error) {
        onError();
      }
    }
  };
  return (
    <LiteCreditCardInput
      onChange={onChange}
      requiresPostalCode={false}
    ></LiteCreditCardInput>
  );
};
