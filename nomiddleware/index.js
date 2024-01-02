const express=require('express')

const app=express()

app.get('/health-checkup',function(req,res){
    const username=req.headers.username
    const password=req.headers.password
    const kidneyId=req.query.kidneyId

    //dumb way of doing input validation and authentication
    if(username=='harkirat' && password=='pass'){
        //do something with kidney
        if(kidneyId==1 || kidneyId==2){
            res.json({
                msg:"Your kidney is fine"
            })
        }
    }

    res.status(400).json({msg:"Something wrong with your input"})
})

app.listen(3000)