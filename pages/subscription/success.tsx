// core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// graphQL
import client from "../../apollo-client";
import { GET_ORDER_SUCCESS_DATA } from "../../graphql/billing/billing";

const Success = () => {
   // router
   const router = useRouter();

   // user Details
   const [checkoutDeets, setCheckoutDeets] = useState<any>(false);
   const [failedTransaction, setFailedTransaction] = useState<string | boolean>(false);

   const getUserCheckoutData = async () => {
      try {
         const { data } = await client.query({
            query: GET_ORDER_SUCCESS_DATA,
            variables: { session_id: router.query.session_id }
         });

         if (data.order_success.__typename === "Successful_Order") {
            const today = Date.now();
            const expTime = new Date(today + 1209600000);

            document.cookie = `authorization=${data.order_success.token}; expires=${expTime}; path=/`;
            setCheckoutDeets(data.order_success);
         } else if (data.order_success.__typename === "Failed_Order") {
            setFailedTransaction(data.order_success.message);
         }
      } catch (error) {
         setFailedTransaction("your transaction failed. Please try again later");
      }
   };

   useEffect(() => {
      if (router.isReady) {
         getUserCheckoutData();
      }
   }, [router.isReady]);

   return (
      <div>
         {checkoutDeets && (
            <div>
               <h1>Congratulations {checkoutDeets.name}</h1>
               <p>a confirmation email has been sent to {checkoutDeets.email}</p>
            </div>
         )}
         {failedTransaction}
      </div>
   );
};

export default Success;