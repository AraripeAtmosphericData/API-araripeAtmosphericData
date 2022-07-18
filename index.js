const express = require("express")
const app = express()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.get("/", (req,res)=>{
    res.send({
        name:"Hugo",
        age:17,
        email:"xxx@gmail.com"
    })
})

app.get("/main" , (req,res)=>{
    res.send({data:"hi"})
})

app.listen(5000, () => {
    console.log("port 5000.");
});

module.exports = app;
