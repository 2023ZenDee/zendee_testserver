const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const router  = require('./routes');
const app = express();


require('dotenv').config();
const port =process.env.PORT;

app.use(cors());
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get('/', (req,res) => {
    res.send('hello world');
})
app.use('/', router);

app.use((req,res,next) =>{
    const error = new Error('[Server]가 존재하지 않습니다.');
    error.status = 404;
    next(error);
});

/*app.use((req,res,next,err) => {
    res.status(err.status || 500);
    res.json(err);
})*/


app.listen(port, ()=>{
    console.log(`localhost:${port} waiting...`);
})