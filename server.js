const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

 const publicuser = require('./routes/api/publicuser');
 const admin = require('./routes/api/admin');



require('dotenv').config();
const cors = require('cors');



const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use(cors());


//DB configur
const dbHnr =  require('./config/keys').mongoURI;

// connect to mongoDb

mongooes
    .connect(dbHnr,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('connect to database'))
    .catch(err =>console.log(err));


app.get("/",(req,res)=>{
    res.send("API");
})

//passport middleware 
app.use(passport.initialize());

//Passport config 
//require('./config/passport')(passport);

//use routes 

app.use('/api/publicuser', publicuser);
app.use('/api/admin', admin);




const port = process.env.PORT  || 5000;

 app.listen(port, console.log(`server is running on port ${port}`));