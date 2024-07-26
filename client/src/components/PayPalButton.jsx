import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { message } from "antd";

message.config({
  top: 250,
  duration: 5,
});

const PayPalButton = ({ total }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "sb",
        components: "buttons",
        "disable-funding": "venmo,paylater",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical", // or 'horizontal'
          color: "gold", // options: 'gold', 'blue', 'silver', 'white', 'black'
          shape: "rect", // options: 'rect', 'pill'
          label: "paypal", // options: 'paypal', 'checkout', 'buynow', 'pay', 'installment'
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            message.success(
              "Transaction completed by " + details.payer.name.given_name
            );
          });
        }}
        onError={(err) => {
          console.error(err);
          message.error(
            "Transaction failed. Please review your details and try again."
          );
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
