const mongoose = require('mongoose');
require('dotenv').config();

const connect = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log('connected');
    } catch (error) {
       console.log('something went wrong'); 
    }
}
module.exports = connect;