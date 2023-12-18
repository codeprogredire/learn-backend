const express = require("express");

const app = express();

var users=[{
    name:"John",
    kidneys:[{
        healthy:false
    }
    ]
}]

app.use(express.json());

//Get the kidney status of the patient
app.get("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;

    let numberOfHealthyKidneys = 0;

    for(let i=0;i<numberOfKidneys;i++)
    {
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys=numberOfHealthyKidneys+1;
        }
    }

    let numberOfUnhealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

//Add kidney
app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})

//Replace unhealthy kidneys with healthy ones
app.put("/",function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy==false){
            users[0].kidneys[i].healthy=true;
        }
    }
    res.json({});
})

//Remove unhealthy kidneys
app.delete("/",function(req,res){
    let badKidneys=false
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy==false){
            badKidneys=true
            break
        }
    }
    if(badKidneys){
        const newKidneys=[]
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy==true){
                newKidneys.push({
                    healthy:true
                })
            }
        }
        users[0].kidneys=newKidneys

        res.json({})
    }
    else{
        res.status(411).json({
            msg:"You have no unhealhty kidneys"
        })
    }
})

app.listen(3000);