import { Request, Response, Router, NextFunction } from "express";
import Stripe from "stripe";
import express from "express";
const BASE_URL = process.env;

const router = Router();

const stripe = new Stripe(
  "sk_test_51LbWG6CISvGskgcJWw3mTxLHdWlC36HHeP9Ui7m5idZ41jf68tbZcNf0RwxlLsBqWgVq4oTsNw5gPBpsYi4gArZg00Yuj9nmcg",
  { apiVersion: "2022-08-01" }
);

router.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount, description } = req.body;
    console.log(description);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: description,
      payment_method: id,
      confirm: true,
    });
    res.send({ message: "Succes" });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

export default router;

// router.post("/create-checkout-session", async (req, res) => {
//   const prices = await stripe.prices.list({
//     lookup_keys: [req.body.lookup_key],
//     expand: ["data.product"],
//   });
//   const session: any = await stripe.checkout.sessions.create({
//     billing_address_collection: "auto",
//     line_items: [
//       {
//         price: prices.data[0].id,
//         // For metered billing, do not pass quantity
//         quantity: 1,
//       },
//     ],
//     mode: "subscription",
//     success_url: `${BASE_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${BASE_URL}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// router.post("/create-portal-session", async (req, res) => {
//   // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
//   // Typically this is stored alongside the authenticated user in your database.
//   const { session_id } = req.body;
//   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

//   // This is the url to which the customer will be redirected when they are done
//   // managing their billing with the portal.
//   const returnUrl: any = BASE_URL;

//   const portalSession = await stripe.billingPortal.sessions.create({
//     customer: checkoutSession.customer,
//     return_url: returnUrl,
//   });

//   res.redirect(303, portalSession.url);
// });

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     let event = request.body;
//     // Replace this endpoint secret with your endpoint's unique secret
//     // If you are testing with the CLI, find the secret by running 'stripe listen'
//     // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
//     // at https://dashboard.stripe.com/webhooks
//     const endpointSecret = "whsec_12345";
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//       // Get the signature sent by Stripe
//       const signature = request.headers["stripe-signature"];
//       try {
//         event = stripe.webhooks.constructEvent(
//           request.body,
//           signature,
//           endpointSecret
//         );
//       } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return response.sendStatus(400);
//       }
//     }
//     let subscription;
//     let status;
//     // Handle the event
//     switch (event.type) {
//       case "customer.subscription.trial_will_end":
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription trial ending.
//         // handleSubscriptionTrialEnding(subscription);
//         break;
//       case "customer.subscription.deleted":
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription deleted.
//         // handleSubscriptionDeleted(subscriptionDeleted);
//         break;
//       case "customer.subscription.created":
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription created.
//         // handleSubscriptionCreated(subscription);
//         break;
//       case "customer.subscription.updated":
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription update.
//         // handleSubscriptionUpdated(subscription);
//         break;
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );
