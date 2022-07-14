const express = require("express")
const app = express()


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
