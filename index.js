const app = require("./app");
const UserModel = require('./models/user_information_model');
const UserReportModel = require('./models/user_report_model');
const AdminRegistrationModel = require('./models/admin_registration_model');
const db = require('./config/db');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://www.mosquinator.online');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
  });
  
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
})