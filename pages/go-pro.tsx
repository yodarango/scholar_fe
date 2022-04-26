import Head from "next/head";
// core
import React from "react";
import { useRouter } from "next/router";

// react
import client from "../apollo-client";
import { CREATE_CHECKOUT_SESSION } from "../graphql/billing/billing";

// components
import NavigationMenu from "../layouts/navigation-menu";

// style
import goProPageStyles from "../styles/pages/GoPro.module.css";

const GoPro = () => {
   // =================== go back in histroy   ============== //
   const router = useRouter();

   // =================== Create checkout Session ============= //
   const checkout = async () => {
      const { data } = await client.mutate({
         mutation: CREATE_CHECKOUT_SESSION,
         variables: {
            price_id: "price_1KspiSFRxjIRnSsY8LpRy8Y7"
         }
      });

      console.log(data.create_checkout_session != "error");
      if (data.create_checkout_session) {
         router.replace(data.create_checkout_session);
      }
   };

   return (
      <>
         <Head key='payment-apge'>
            <script src='https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch'></script>
            <script src='https://js.stripe.com/v3/'></script>
         </Head>

         <div className={goProPageStyles.mainWrapper}>
            <span className={`goBack ${goProPageStyles.goBack}`} onClick={() => router.back()}>
               {"<"}
            </span>
            <h1 className={`${goProPageStyles.stdH1} std-button_gradient-text`}>
               HELP SCHOLAR STAY ALIVE!
            </h1>
            <button
               className={`std-button--clear ${goProPageStyles.stdButton} ${goProPageStyles.stdButtonClear}`}>
               <p className={`std-button_gradient-text`}>ONE TIME DONATION</p>
            </button>

            {/* <form action='/create-checkout-session' method='POST'>
               <input type='hidden' name='lookup_key' value='price_1KrmD2FRxjIRnSsYZRJNZf9o' />
               <button id='checkout-and-portal-button' type='submit'>
                  Checkout
               </button>
            </form> */}
            <button className={`std-button ${goProPageStyles.stdButton}`} onClick={checkout}>
               <p className={`std-button_gradient-text`}>JOIN FOR ONLY $2.99/month</p>
            </button>
            <p className={`std-text-block--info ${goProPageStyles.stdInfoText}`}>Canel any time!</p>
            <div className={`${goProPageStyles.verctorItem}`}></div>
            <h2 className={goProPageStyles.stdH2}>Why go PRO?</h2>
            <p className={goProPageStyles.stdP}>
               When you go PRO you help Scholar:
               <ul>
                  <li>Stay live</li>
                  <li>add-free</li>
                  <li>look slick</li>
                  <li>function efficiently</li>
                  <li>provide great Christian resources</li>
                  <li>keep growing in all of the above</li>
               </ul>
            </p>
            <h2 className={goProPageStyles.stdH2}>
               What are the benefits of upgrading to the PRO version?
            </h2>
            <p className={goProPageStyles.stdP}>
               Scholar does not delimit the access to any content for FREE tier users. The purpose
               of Scholar is to help Christians fall in love with the word of God, therefore it does
               not seem right to block access to any of the resources. However, there is a limit to
               how much data FREE tier can create, the PRO version gives you unlimited content
               creation. <br />
               Below is a table that helps you understand the differences of the FREE and PRO
               versions:
            </p>
            <table className={goProPageStyles.table}>
               <tbody>
                  <tr>
                     <th>FREE</th>
                     <th>PRO</th>
                  </tr>
                  <tr>
                     <td>Limit to 10 posts</td>
                     <td>Unlimited Posts</td>
                  </tr>
                  <tr>
                     <td>Limit to 5 comments/ day</td>
                     <td>Unlimited comments</td>
                  </tr>
                  <tr>
                     <td>Limit to 50 posts reactions/ day</td>
                     <td>Unlimited reactions</td>
                  </tr>
               </tbody>
            </table>
            {/* <h2 className={goProPageStyles.stdH2}>Does it really take alot to run Scholar?</h2>
         <div className={`${goProPageStyles.infrastructureIcons}`}>

         </div> */}

            <div className={"large-spacer"}></div>
            <NavigationMenu />
         </div>
      </>
   );
};

export default GoPro;
