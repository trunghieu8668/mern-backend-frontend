const express = require ('express')
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const expressValidator = require('express-validator');
// App
const app = express();
// import router
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const brainTreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')
// Db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{console.log('DB conntect')})

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//Roter middleware

app.use("/api", authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', brainTreeRoutes);
app.use('/api', orderRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "You must be logged in"})
  }
});
//
const port = process.env.PORT || 8000

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'))
}
//Run
app.listen(port, () =>{
    console.log('Server is start on Port: ' + port)
})
