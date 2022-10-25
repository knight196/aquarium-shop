const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const addProduct = require('./Schema/addProduct')
const authRoutes = require('./routes/routesauth')
const productRouter = require('./routes/productroutes')
const path = require('path')
const Userdashboard = require('./Userdashboard/Userorders')
const Admindashboard = require('./Admindashboard/AdminOrders')
const cloudinary = require('cloudinary').v2



const stripe = require('stripe')('sk_test_51LtvUXJI0em1KAyRDVAbiHk3n1U7ZHnm1Jq6ymcpH2E9ccQnSb8avy4f2wiBpbZFizVhTagXOh6ThkIl06cTJPrU002wTxBybg')


dotenv.config();

const app = express();
const port = process.env.PORT || 5000


//middlewares
app.use(express.json({limit:'25mb'}))
app.use(express.urlencoded({limit:'25mb', extended:true}))
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
// app.use(cors())


app.use('/api', productRouter)
app.use('/orders', Userdashboard)
app.use('/api/', Admindashboard)



//connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)

//cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
 })


// API for PAYMENT

app.get("/config", (req, res) => {
    res.send({
      publishableKey: 'pk_test_51LtvUXJI0em1KAyRvQVz8eLL2Q1Mva0cNgWH5jMqyLR4682taIOg8K56mJUei50MTl1iMvj37iGhfwlgRBJ39dEy00nhy5zi37'
    });
  });

  app.post("/create-payment-intent", async (req, res) => {
    const total = req.body.amount;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "GBP",
        amount: total*100,
        payment_method_types:['card','klarna']
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });

  // cloudinary image upload 
app.post('/newproducts/add', async (req,res) => {

  const {slug,title,category,description,Company,price,image,position,difficulty,CompanyProductName,details} = req.body

  try{

    const result = await cloudinary.uploader.upload(image, {
      folder:'aquariumShop',
      width:1920,
      crop:'scale'
    })


    const listproducts = await addProduct.create({
      slug,
      title,
      category,
      description,
      Company,
      price,
      image:{
        public_id: result.public_id,
        url:result.secure_url
      },
      position,
      difficulty,
      CompanyProductName,
      details      
    })
  
    res.status(201).json({
      success:true,
      listproducts
    })
  }catch(err){
    console.log(err)
  }


})


  
    

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


// app.use('/', (req,res)=> res.send('homepage'))

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
  })

















