const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const{connectDB}=require('./db/index')

const express = require("express");
const app = express();
const port = process.env.PORT || 2000; 

app.use(express.json());

app.listen(port, () => {
    console.log("Listening on port " + port);
});
connectDB()
