const express = require('express')
const Account = require('../Schema/User')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const handlebars = require('handlebars')
const dotenv = require('dotenv')
const path = require('path')

const productRouter = express.Router()

const bcrypt = require('bcryptjs');

dotenv.config({path:path.resolve(__dirname, '../.env')});

//feedback 

productRouter.post('/reviewEmail', async (req,res) => {

const {email,image,slug,reviewBody,reviewTitle,selectedrating} = req.body


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
    partialDir: path.resolve(__dirname,'../views'),
    defaultLayout:false
  },
  viewPath:path.resolve(__dirname,'../views'),
  extName:'.handlebars'
}

transporter.use('compile', hbs(handlebarOptions))

var mailOptions = {
  from:process.env.user,
  to:email,
  subject:'Order confirmation',
  template:'feedback',
  context:{
    image,
    slug,
    reviewBody,
    reviewTitle,
    selectedrating
  }
}

await transporter.sendMail(mailOptions)
res.status(200).json({success:true,message:'Email sent'})
}catch(err){
res.status(500).json(err.message)
}

})

//feedback product
handlebars.registerHelper('star', function (star) {


  const array = [...Array(star).keys()].map(i=> {
    return new handlebars.SafeString('<span style="color:orange">&#9733</span>')
  })
return array.join('')
})



//cancellation request
productRouter.post('/cancelemail', async (req,res) => {

  const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;


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
      partialDir: path.resolve(__dirname,'../views'),
      defaultLayout:false
    },
    viewPath:path.resolve(__dirname,'../views'),
    extName:'.handlebars'
  }
  
  transporter.use('compile', hbs(handlebarOptions))
  
  var mailOptions = {
    from:process.env.user,
    to:email,
    subject:'Order Cancel confirmation',
    template:'cancelemail',
    context:{
      items:result,
      subtotal:subtotal,
      totalAmount:totalAmount,
      address:address,
      paymentCreate:paymentCreate,
      orderId:orderId,
      deliveryOptions:deliveryOptions,
      deliveryPrice:deliveryPrice,
      deliveryDate:deliveryDate
    }
  }
  
  await transporter.sendMail(mailOptions)
  res.status(200).json({success:true,message:'Email sent'})
  }catch(err){
  res.status(500).json(err.message)
  }
  

})

//order confirmation 
productRouter.post('/sendemail', async (req,res) => {
  
  const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
  

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
        partialDir: path.resolve(__dirname,'../views'),
        defaultLayout:false
      },
      viewPath:path.resolve(__dirname,'../views'),
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
        subtotal:subtotal,
        totalAmount:totalAmount,
        address:address,
        paymentCreate:paymentCreate,
        orderId:orderId,
        deliveryOptions:deliveryOptions,
        deliveryPrice:deliveryPrice,
        deliveryDate:deliveryDate
      }
    }
    
    await transporter.sendMail(mailOptions)
    res.status(200).json({success:true,message:'Email sent'})
    }catch(err){
    res.status(500).json(err.message)
    }
    
    })

    //cancellation request
    productRouter.post('/cancelemail', async (req,res) => {

      const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
    
    
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
          partialDir: path.resolve(__dirname,'../views'),
          defaultLayout:false
        },
        viewPath:path.resolve(__dirname,'../views'),
        extName:'.handlebars'
      }
      
      transporter.use('compile', hbs(handlebarOptions))
      
      var mailOptions = {
        from:process.env.user,
        to:email,
        subject:'Order Cancel confirmation',
        template:'cancelemail',
        context:{
          items:result,
          subtotal:subtotal,
          totalAmount:totalAmount,
          address:address,
          paymentCreate:paymentCreate,
          orderId:orderId,
          deliveryOptions:deliveryOptions,
          deliveryPrice:deliveryPrice,
          deliveryDate:deliveryDate
        }
      }
      
      await transporter.sendMail(mailOptions)
      res.status(200).json({success:true,message:'Email sent'})
      }catch(err){
      res.status(500).json(err.message)
      }
      

    })

    //order cancelled confirmed
    productRouter.post('/confirmOrderCancelemail', async (req,res) => {

      const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
    
    
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
          partialDir: path.resolve(__dirname,'../views'),
          defaultLayout:false
        },
        viewPath:path.resolve(__dirname,'../views'),
        extName:'.handlebars'
      }
      
      transporter.use('compile', hbs(handlebarOptions))
      
      var mailOptions = {
        from:process.env.user,
        to:email,
        subject:'Order Cancel confirmation',
        template:'orderCanceled',
        context:{
          items:result,
          subtotal:subtotal,
          totalAmount:totalAmount,
          address:address,
          paymentCreate:paymentCreate,
          orderId:orderId,
          deliveryOptions:deliveryOptions,
          deliveryPrice:deliveryPrice,
          deliveryDate:deliveryDate
        }
      }
      
      await transporter.sendMail(mailOptions)
      res.status(200).json({success:true,message:'Email sent'})
      }catch(err){
      res.status(500).json(err.message)
      }
      

    })

      //order cancelled confirmed
      productRouter.post('/deliveredemail', async (req,res) => {

        const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
      
      
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
            partialDir: path.resolve(__dirname,'../views'),
            defaultLayout:false
          },
          viewPath:path.resolve(__dirname,'../views'),
          extName:'.handlebars'
        }
        
        transporter.use('compile', hbs(handlebarOptions))
        
        var mailOptions = {
          from:process.env.user,
          to:email,
          subject:'Delivered',
          template:'delivered',
          context:{
            items:result,
            subtotal:subtotal,
            totalAmount:totalAmount,
            address:address,
            paymentCreate:paymentCreate,
            orderId:orderId,
            deliveryOptions:deliveryOptions,
            deliveryPrice:deliveryPrice,
            deliveryDate:deliveryDate
          }
        }
        
        await transporter.sendMail(mailOptions)
        res.status(200).json({success:true,message:'Email sent'})
        }catch(err){
        res.status(500).json(err.message)
        }
        
  
      })

         //return 
         productRouter.post('/returnemail', async (req,res) => {

          const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
        
        
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
              partialDir: path.resolve(__dirname,'../views'),
              defaultLayout:false
            },
            viewPath:path.resolve(__dirname,'../views'),
            extName:'.handlebars'
          }
          
          transporter.use('compile', hbs(handlebarOptions))
          
          var mailOptions = {
            from:process.env.user,
            to:email,
            subject:'Returned',
            template:'return',
            context:{
              items:result,
              subtotal:subtotal,
              totalAmount:totalAmount,
              address:address,
              paymentCreate:paymentCreate,
              orderId:orderId,
              deliveryOptions:deliveryOptions,
              deliveryPrice:deliveryPrice,
              deliveryDate:deliveryDate
            }
          }
          
          await transporter.sendMail(mailOptions)
          res.status(200).json({success:true,message:'Email sent'})
          }catch(err){
          res.status(500).json(err.message)
          }
          
    
        })


        //refund
          
      productRouter.post('/refundemail', async (req,res) => {

        const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
      
      
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
            partialDir: path.resolve(__dirname,'../views'),
            defaultLayout:false
          },
          viewPath:path.resolve(__dirname,'../views'),
          extName:'.handlebars'
        }
        
        transporter.use('compile', hbs(handlebarOptions))
        
        var mailOptions = {
          from:process.env.user,
          to:email,
          subject:'Refund',
          template:'refund',
          context:{
            items:result,
            subtotal:subtotal,
            totalAmount:totalAmount,
            address:address,
            paymentCreate:paymentCreate,
            orderId:orderId,
            deliveryOptions:deliveryOptions,
            deliveryPrice:deliveryPrice,
            deliveryDate:deliveryDate
          }
        }
        
        await transporter.sendMail(mailOptions)
        res.status(200).json({success:true,message:'Email sent'})
        }catch(err){
        res.status(500).json(err.message)
        }
        
  
      })

    
      

      //send the payment error message when payment is rejected or failed

      productRouter.post('/failedpayment', async (req,res) => {

        const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
      
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
            partialDir: path.resolve(__dirname,'../views'),
            defaultLayout:false
          },
          viewPath:path.resolve(__dirname,'../views'),
          extName:'.handlebars'
        }
        
        transporter.use('compile', hbs(handlebarOptions))
        
        var mailOptions = {
          from:process.env.user,
          to:email,
          subject:'Failed Payment',
          template:'recheckpayment',
          context:{
            items:result,
            subtotal:subtotal,
            totalAmount:totalAmount,
            address:address,
            paymentCreate:paymentCreate,
            orderId:orderId,
            deliveryOptions:deliveryOptions,
            deliveryPrice:deliveryPrice,
            deliveryDate:deliveryDate,
          
          }
        }
        
        

        await transporter.sendMail(mailOptions)
        res.status(200).json({success:true,message:'Email sent'})
      }catch(err){
        res.status(500).json(err.message)
      }

      })

      //send the successful message for the payment 

         //send the payment error message when payment is rejected or failed

         productRouter.post('/successrepayment', async (req,res) => {

          const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
        
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
              partialDir: path.resolve(__dirname,'../views'),
              defaultLayout:false
            },
            viewPath:path.resolve(__dirname,'../views'),
            extName:'.handlebars'
          }
          
          transporter.use('compile', hbs(handlebarOptions))
          
          var mailOptions = {
            from:process.env.user,
            to:email,
            subject:'Payment Successful',
            template:'repaymentSuccess',
            context:{
              items:result,
              subtotal:subtotal,
              totalAmount:totalAmount,
              address:address,
              paymentCreate:paymentCreate,
              orderId:orderId,
              deliveryOptions:deliveryOptions,
              deliveryPrice:deliveryPrice,
              deliveryDate:deliveryDate,
            }
          }
          
          
  
          await transporter.sendMail(mailOptions)
          res.status(200).json({success:true,message:'Email sent'})
        }catch(err){
          res.status(500).json(err.message)
        }
  
        })


         //dispatch the item 

         productRouter.post('/dispatchitem', async (req,res) => {

          const {email,result,subtotal,totalAmount,address,paymentCreate,orderId,deliveryOptions,deliveryPrice,deliveryDate}  = req.body;
        
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
              partialDir: path.resolve(__dirname,'../views'),
              defaultLayout:false
            },
            viewPath:path.resolve(__dirname,'../views'),
            extName:'.handlebars'
          }
          
          transporter.use('compile', hbs(handlebarOptions))
          
          var mailOptions = {
            from:process.env.user,
            to:email,
            subject:'Dispatched',
            template:'dispatch',
            context:{
              items:result,
              subtotal:subtotal,
              totalAmount:totalAmount,
              address:address,
              paymentCreate:paymentCreate,
              orderId:orderId,
              deliveryOptions:deliveryOptions,
              deliveryPrice:deliveryPrice,
              deliveryDate:deliveryDate
            }
          }
          
          
  
          await transporter.sendMail(mailOptions)
          res.status(200).json({success:true,message:'Email sent'})
        }catch(err){
          res.status(500).json(err.message)
        }
  
        })
  
      

   
    

    //email the password reset from form
    productRouter.post('/emailPassword', async (req,res) => {
    
    
      const {id,email} = req.body
    
    try{
    
    var transporter = nodemailer.createTransport({
      service:'hotmail',
      auth:{
        user:process.env.user,
        pass:process.env.pass
      }
    })
    
    var mailOptions = {
      from:process.env.user,
      to:email,
      subject:'Password Reset',
      html:`
      Click on the link below to change your new password
      https://aquarium-shop-t2o8.onrender.com/passwordReset/${id}
      `
    }
    await transporter.sendMail(mailOptions)
    
    res.status(200).json({success:true, message:'email sent'})
    
    }catch(err){
    
      res.status(404).send(err.message)
    
    }
    
    })
    
    //user will be redirected to the new password page
    productRouter.post('/confirmresetPwd', async (req,res) => {
    
    
      const {email} = req.body
    
    try{
    
    var transporter = nodemailer.createTransport({
      service:'hotmail',
      auth:{
        user:process.env.user,
        pass:process.env.pass
      }
    })
    
    var mailOptions = {
      from:process.env.user,
      to:email,
      subject:'Password Creation Success',
      html:`
      Your password has been created successfully.
      https://aquarium-shop-t2o8.onrender.com`
    }
    await transporter.sendMail(mailOptions)
    
    res.status(200).json({success:true, message:'email sent'})
    
    }catch(err){
    
      res.status(404).send(err.message)
    
    }
    
    
    })

    //conditional of the email for the reset password

productRouter.get('/useremail/:email', async (req,res) => {

  try{
    const  email  = await Account.findOne({email:req.params.email})
  
    res.status(200).json(email)
  }catch(err){
    console.log(err)
  }
  
  })
  
  //reset the password from using user id
  productRouter.get('/userresetpwd/:id', async (req,res) => {
  
    try{
  
  
      const email = await Account.findOne({_id:req.params.id})
  
  
      res.status(200).json(email)
  
    }catch (err){
      console.log(err)
    }
  
  })
  
  //user password will be created and saved as encryption
  productRouter.put('/passwordreset', async (req,res) => {
  
    try{
      
  
      const hashPassword = await bcrypt.hash(req.body.password,10)
  
     const pwdUpdate =  await Account.findByIdAndUpdate(
        {_id:req.body.id},
        {$set:{password:hashPassword}}
      )
  
  res.status(200).json({pwdUpdate})
  
    }catch(err){
      console.log(err)
    }
  
  })
  

    module.exports = productRouter