import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import CustomButton from './CustomButton';
import { PaymentProps } from '@/types/type';
import { fetchAPI } from '@/lib/fetch';

const Payments = ({fullName, email, amount}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false)

    const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {

    // Make a request to your own server.
    const {paymentIntent, customer} = await fetchAPI('/(api)/(stripe)/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          name: fullName || email.split('@')[0],
          email: email,
          amount: amount,
          paymentMethodId: paymentMethod.id
        }
      )
      }) 

      if(paymentIntent.client_secret){
        const { result } = await fetchAPI('/(api)/(stripe)/pay', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              payment_method_id: paymentMethod.id,
              payment_intent_id: paymentIntent.id,
              customer_id: customer
            }
          )
        })
        
        if(result.client_secret){
            // xx ride/create
        }
      }

    // Call the `intentCreationCallback` with your server response's client secret or error
    const { clientSecret, error } = await response.json();
    if (clientSecret) {
      intentCreationCallback({clientSecret})
    } else {
      intentCreationCallback({error})
    }
  }

    const initializePaymentSheet = async () => {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Uber Clone Inc.",
        intentConfiguration: {
          mode: {
            amount: 1099,
            currencyCode: "USD",
          },
          confirmHandler: confirmHandler,
        },
      });
      if (error) {
        // handle error
      }
    };
  

    const openPaymentSheet = async () => {

        await initializePaymentSheet()

        const { error } = await presentPaymentSheet();

        if (error) {
          if (error.code === PaymentSheetError.Canceled) {
            Alert.alert("Payment Canceled", "couldn't process payment due to some error!");
          }
        } else {
          setSuccess(true)
        }
    }

  return (
    <CustomButton
      title="Confirm Ride"
      onPress={() => openPaymentSheet()}
      className="mt-4"
    />
  );
}

export default Payments