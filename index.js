const express = require("express")
const app = express()

app.get("/main" , (req,res)=>{
    res.send({data:"hi"})
})

app.listen(8080, ()=>{console.log("http://localhost:8080")})