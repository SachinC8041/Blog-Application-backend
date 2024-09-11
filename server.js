const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
app.use(express.json());

const blog = require('./routes/blogrouter');
app.use(blog);




const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log('this is blog backend');
})
app.get('/',(req,res)=>{
    res.send('this is server 3000 of blog backend practice. Welcome abord !!!!')
})

