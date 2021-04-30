const express = require("express");
const cors = require('cors')
const path = require("path");
const app = express();
app.use(cors())
const bodyParser = require("body-parser");
const route = require("./routes/khaltiroutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);


app.listen(3000, function(error){
    if(error){
        console.log("SOMTHING WENT WRONG");
    }else{
        console.log("SERVER IS RUNNING ON PORT 3000");
    }
})
