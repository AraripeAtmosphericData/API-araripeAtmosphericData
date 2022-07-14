const express = require("express")
const app = express()


app.get("/", (req,res)=>{
    res.send({data:"hi"})
})

app.get("/main" , (req,res)=>{
    res.send({data:"hi"})
})
