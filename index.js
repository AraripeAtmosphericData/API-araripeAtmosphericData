const express = require("express")
const app = express()


app.get("/", (req,res)=>{
    res.send({data:"hi"})
})

app.get("/main" , (req,res)=>{
    res.send({data:"hi"})
})

app.listen(5000, () => {
    console.log("port 5000.");
});

module.exports = app;
