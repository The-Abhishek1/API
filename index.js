const express = require('express');
const app = express();

const stripe = require('stripe')('sk_test_YOUR-KEY');

app.get('/api', (req, res) => {

    const apikey = req.query.apikey;

    // TODO validate API key
    // TODO bill user for usage

    res.send({ data: '🔥🔥🔥🔥🔥🔥🔥' });

});

app.listen(8080, () => console.log('alive on http://localhost:8080'));

app.post('/checkout', async(req, res) => {

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_YOUR-PRICE',
        }, ],
        sucees_url: 'http://localhost:5000/success?session_id={CHECKOUT_SESSION}',
        cancel_url: 'http://localhost:5000/error'
    })


    res.send(session);
});