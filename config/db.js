const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('open', () => {
  console.log('MongoDB Connected');
});

db.on('error', (err) => {
  console.error('MongoDB Connection error:', err);
});

module.exports = mongoose;
//rjsanjuan
//FD9adN8K5ZxCqZCC

//rj_sanjuan
//rrClnASSJR4cQwzS

//text