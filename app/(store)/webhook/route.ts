import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers()
    const sig = headersList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "No Signature " }, { status: 400 })
    }

    const webhookSecrete = process.env.STRIPE_WEBHOOK_SECRETE;

    if (!webhookSecrete) {
        console.log("Stripe webhook secrete is not set.")
        return NextResponse.json(
            { error: "Stripe webhook secrete is not se" },
            { status: 400 }
        )
    };

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecrete)

    } catch (error) {
        console.error("Webhook signature verification failed :", error)
        return NextResponse.json(
            { error: `Webhook Error : ${error}` },
            { status: 400 }
        )
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order)
        } catch (error) {
            console.error("Error creating order in Sanity :", error)
            return NextResponse.json(
                { error: "Error creating order" },
                { status: 500 }

            )
        }
    }
    return NextResponse.json({ received: true })
}
async function createOrderInSanity(session: Stripe.Checkout.Session) { 
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
    } = session;

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        //: make installation of stripe cli 4:07

        id,
        {
            expand: ["data.price.product"],

        }
    );
    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,

    }));
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount
            ? total_details.amount_discount / 100 : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),

    });
    console.log("Order created with ID:", order);   
    return order;

}