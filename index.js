const fs = require('fs');
const path = require('path');
const app = require("./app");
const UserModel = require('./models/user_information_model');
const UserReportModel = require('./models/user_report_model');
const AdminRegistrationModel = require('./models/admin_registration_model');
const db = require('./config/db');

const port = process.env.PORT || 5000;

app.get('/robots.txt', (req, res) => {
    const filePath = path.join(__dirname, 'robots.txt');
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
})