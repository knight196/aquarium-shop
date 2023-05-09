const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const authRoutes = require('./routes/routesauth')
const productRouter = require('./routes/productroutes')
const path = require('path')
const Userdashboard = require('./Userdashboard/Userorders')
const Admindashboard = require('./Admindashboard/AdminOrders')
const newProduct = require('./routes/newproduct')
const emailProduct = require('./routes/emailRoute')
const bodyParser = require('body-parser')
dotenv.config({path:path.resolve(__dirname, './.env')});

const stripe = require('stripe')('sk_test_51LtvUXJI0em1KAyRDVAbiHk3n1U7ZHnm1Jq6ymcpH2E9ccQnSb8avy4f2wiBpbZFizVhTagXOh6ThkIl06cTJPrU002wTxBybg')




const app = express();
const port = process.env.PORT || 5000


//middlewares
app.use(express.json({limit:'25mb'}))
app.use(express.urlencoded({limit:'25mb', extended:true}))
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())


app.use('/api', productRouter)
app.use('/orders', Userdashboard)
app.use('/api/', Admindashboard)
app.use('/newproduct', newProduct)
app.use('/emailproduct', emailProduct)



//connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)



// API for PAYMENT

  app.post("/create-payment", async (req, res) => {
    const {amount} = req.body
    try {

      const paymentIntent = await stripe.paymentIntents.create({    
        currency: "GBP",
        amount: amount * 100,
        payment_method_types:['card']
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
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


// app.use('/', (req,res)=> res.send('homepage'))

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
  })

















