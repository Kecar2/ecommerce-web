import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEYY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                nilling_adress_collection: 'auto',
                shipping_ooptions: [
                    { shipping_rate: 'shr_1LVwtwH1GK1wAdkz8gM5hWpb'},
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/x2ifhfqm/production/').replace('-webp', '.webp')

                    return {
                        price_data: { 
                            currency: 'EUR',
                            product_data: {
                                name: item.name,
                                image: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
        
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }

            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}