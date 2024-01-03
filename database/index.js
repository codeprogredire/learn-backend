const express = require('express')
const mongoose=require('mongoose')

const app=express()


mongoose.connect('mongodb+srv://kislay1854:iR_3g%3D7sKs3TEbq@cluster0.x85epwn.mongodb.net/users_app')

const User=mongoose.model('users',{name:String,email:String,password:String})

app.use(express.json())

app.post('/signup',async function(req,res){
    const email=req.body.email
    const password=req.body.password
    const name=req.body.name

    const existingUser=await User.findOne({email:email})

    if(existinguser){
        return res.status(400).send('Email already exists')
    }

    const user=new User({
        name:name,
        email:email,
        password:password
    })
    
    user.save()

    res.json({
        msg:'User created successfully'
    })

})

app.listen(3000)