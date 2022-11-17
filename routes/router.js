require('dotenv').config()
const router = require('express').Router();
const User = require('../model/userModel')
const nodeMailer = require('nodemailer')


//setting up the nodeMailer
//step1 create a Transport
const receiver_Email = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Email_Address,
        pass: process.env.Pass_Token
    }
})

//step2 verifing the email and pass
receiver_Email.verify((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Email verified successfully!')
    }
})

//nodemailer ends



router.post('/submit',async(req,res)=>{

    try {
        const newUser = new User(req.body);
        await newUser.save();

        const {name,email,phone,date} = req.body;

        const mail = {
            from:process.env.Email_Address,
            to:`${email}`,
            subject:"Recorded Response",

            html:`<h1>Thank you for your response</h1>
                    <p>${name}</p>
                    <p>${email}</p>                                        
                    <p>${phone}</p>
                    <p>${date}</p>`
        };
        receiver_Email.sendMail(mail, (err) => {
            if (err) {
                res.json(err)
            } else {
                res.json({ code: 200, status: "Message Sent" });
            }
        })



        res.status(200).send({
            message:"send.."
        })
        res.end()
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
        res.end()
    }
})

router.post('/get-all-records',async(req,res)=>{
    try {
        const getRecords = await User.find()
        // console.log(getRecords)
        res.send(getRecords)
        res.end()
    } catch (error) {
        res.status(500).json(error)
        res.end()
    }
})

module.exports = router;