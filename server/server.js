const express = require("express");
const mongoose = require("mongoose");

var path = require('path');
const logger = require("morgan");
const cors = require('cors');
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


const db=require('./config/config').get(process.env.NODE_ENV);


const user = require('./routes/user');

const task = require('./routes/task');


const app = express();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true }));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  }
);


app.use('/user',user);

app.use('/task',task);




//if(process.env.NODE_ENV==="production"){

  app.use(express.static(path.join(__dirname,"../")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','index.html'));
  })
//}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
