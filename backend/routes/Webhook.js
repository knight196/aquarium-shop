const express = require('express')
const Orders = require('../Schema/Orders')
const dotenv = require('dotenv')
const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
dotenv.config({path:path.resolve(__dirname, './.env')});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const Router = express.Router()

//middlewares


// API for PAYMENT
Router.post("/create-payment", async (req, res) => {
    const {amount,basket,orderId,subtotal,username,email,deliveryOptions,deliveryPrice,deliveryDate,address}=req.body


    const arr = basket.map(item => {

      return{
        title:item.title,
        price:item.price,
        packaging:item.packaging,
        color:item.color,
        quantity:item.quantity,
        image:item.image.url
      }

    })


    try {

      const paymentIntent = await stripe.paymentIntents.create({   
        currency: "GBP",
        amount: amount * 100,
        payment_method_types:['klarna'],
        metadata:{
          basket:JSON.stringify(arr),
          orderId:orderId,
          username:username,
          email:email,
          deliveryOptions:deliveryOptions,
          deliveryPrice:deliveryPrice,
          deliveryDate:deliveryDate,
          subtotal:subtotal,
          amount:amount,
          address:JSON.stringify(address)
        },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.json({clientSecret: paymentIntent.client_secret});
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
    
  }); 
 
 
 // This is your Stripe CLI webhook secret for testing your endpoint locally.
Router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig,process.env.endpointSecret);
      console.log('webhook verified')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
       console.log('succeeded', paymentIntent.id);
       let intent = await stripe.paymentIntents.retrieve(paymentIntent.id)
       
       console.log(intent)
       try{

        Orders.create({
          products:JSON.parse(intent?.metadata?.basket),
          email:intent?.metadata?.email,
          username:intent?.metadata?.username,
          orderId:intent?.metadata?.orderId,
          paymentCreate:'Klarna',
          deliveryDate:intent?.metadata?.deliveryDate,
          deliveryOptions:intent?.metadata?.deliveryOptions,
          deliveryPrice:intent?.metadata?.deliveryPrice,
          subtotal:intent?.metadata?.subtotal,
          address:JSON.parse(intent?.metadata?.address),
          amount:intent?.metadata?.amount,
          paymentConfirm:intent?.status
        })

        
      var transporter = nodemailer.createTransport({
        service:'hotmail',
      auth : {  
        user:process.env.user,
        pass:process.env.pass
      }
    })
    
    const handlebarOptions = {
      viewEngine:{
        extName: '.handlebars',
        partialDir: path.resolve(__dirname,'../views'),
        defaultLayout:false
      },
      viewPath:path.resolve(__dirname,'../views'),
      extName:'.handlebars'
    }
    
    transporter.use('compile', hbs(handlebarOptions))
    
    var mailOptions = {
      from:process.env.user,
      to:intent?.metadata?.email,
      subject:'Order confirmation',
      template:'email',
      context:{
        items:JSON.parse(intent?.metadata?.basket),
        subtotal:intent?.metadata?.subtotal,
        totalAmount:intent?.metadata?.amount,
        address:JSON.parse(intent?.metadata?.address),
        paymentCreate:'Klarna',
        orderId:intent?.metadata?.orderId,
        deliveryOptions:intent?.metadata?.deliveryOptions,
        deliveryPrice:intent?.metadata?.deliveryPrice,
        deliveryDate:intent?.metadata?.deliveryDate
      }
    }
    
    await transporter.sendMail(mailOptions)
    response.status(200).json({success:true,message:'Email sent'})
          
        }catch(err){
          console.log(err.message)
          return response.status(500).json('server internal error')

          

        }
      
       
     
       break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });




  module.exports = Router