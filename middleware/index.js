const express=require('express')

const app=express()

function userMiddleware(req,res,next){
    const username=req.headers.username
    const password=req.headers.password
    
    if(username!='harkirat'|| password!='pass')
    {
        res.status(403).json({
            msg:'Incorrect input'
        })
    }
    else{
        next()
    }
}

function kidneyMiddleware(req,res,next){
    const kidneyId=req.query.kidneyId

    if(kidneyId!=1 || kidneyId!=2){
        res.status(403).json({
            msg:"Incorrect input"
        })
    }
    else{
        next()
    }
}

//it is a middleware that ensures we receive body input for post operation
//app.use(express.json())

app.get('/health-checkup',userMiddleware,kidneyMiddleware,function(req,res){
    res.json({
        msg:"Your kidney is fine"
    })
})