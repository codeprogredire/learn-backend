const express=require('express')

const zod=require('zod')

const app=express()

const schema=zod.array(zod.number())

app.use(express.json())

//async function middleware(req,res,next){
    //await fetch()
    //next
//}

/*
{
    email: @
    password: atleast 8 letters
    country: 'IN' or 'US'
    kidneys: [1,2]
}
*/

const schema1=zod.object({
    email: zod.string().email(),
    password:zod.string().min(8),
    country:zod.literal('IN').or(zod.literal('US')),
    kidneys:zod.array(zod.number())
})

app.post('/health-checkup',function(req,res){
    const kidneys=req.body.kidneys //kidneys is an array
    const response=schema.safeParse(kidneys)
    //const kidneyLength=kidneys.length

    //res.send('you have '+kidneyLength+' kidneys')
    if(!response.success){
        res.status(411).json({
            msg:"input is invalid"
        })
    }
    else{
        res.send({
            response
        })
    }
})

//global catches -- used to handle errors by sending appropriate msg to end user instead of error 
//global catches helps users get better error msgs
app.use(function(err,req,res,next){
    res.json({
        msg:"Sorry something is up with our server"
    })
})

app.listen(3000)