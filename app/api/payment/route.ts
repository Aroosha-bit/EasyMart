import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const POST = async (request: NextRequest) => {
  console.log("env",process.env.STRIPE_SECRET_KEY);

  try {
    const { items } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",

          product_data: {
            name: item.item,
          },

          unit_amount: Math.round(
            parseFloat(String(item.price).replace("$", "")) * 100
          ),
        },

        quantity: item.quantity,
      })),

      mode: "payment",

      success_url: "http://localhost:3000/success",

      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};