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
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const bodyParser = require('body-parser')

const stripe = require('stripe')('sk_test_51LtvUXJI0em1KAyRDVAbiHk3n1U7ZHnm1Jq6ymcpH2E9ccQnSb8avy4f2wiBpbZFizVhTagXOh6ThkIl06cTJPrU002wTxBybg')


dotenv.config({path:path.resolve(__dirname, './.env')});


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

  // cloudinary image upload 
app.post('/newproducts/add', async (req,res) => {

  const {slug,title,category,description,Company,price,image,position,difficulty,CompanyProductName,details,variants,images,colors} = req.body
  try{

    const result = await cloudinary.uploader.upload(image, {
      folder:'aquariumShop',
      width:1920,
      crop:'scale'
    })


    let images = [...req.body.images];
    let imagesBuffer = []

    for(let i=0; i<images.length; i++){
     const result = await cloudinary.uploader.upload(images[i], {
        folder:'aquariumvariants',
        width:1920,
        crop:'scale'
      })
      
      imagesBuffer.push({
        public_id:result.public_id,
        url:result.secure_url
      })
      
    }
      
    req.body.images = imagesBuffer


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
      details,
      variants,
      images:imagesBuffer,
      colors,
  
    })
  
    res.status(201).json({
      success:true,
      listproducts
    })
  }catch(err){
    console.log(err)
  }


})

app.post('/api/sendemail', async (req,res) => {

const {email,result,totalAmount,address,paymentCreate,orderId}  = req.body;


try{

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
    partialDir: path.resolve(__dirname,'./views'),
    defaultLayout:false
  },
  viewPath:path.resolve(__dirname,'./views'),
  extName:'.handlebars'
}

transporter.use('compile', hbs(handlebarOptions))

var mailOptions = {
  from:process.env.user,
  to:email,
  subject:'Order confirmation',
  template:'email',
  context:{
    items:result,
    totalAmount:totalAmount,
    address:address,
    paymentCreate:paymentCreate,
    orderId:orderId
  }
}

await transporter.sendMail(mailOptions)
res.status(200).json({success:true,message:'Email sent'})
}catch(err){
res.status(500).json(err.message)
}

})

    
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


// app.use('/', (req,res)=> res.send('homepage'))

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
  })

















