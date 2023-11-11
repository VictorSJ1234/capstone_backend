const app = require("./app");
const UserModel = require('./models/user_information_model');
const UserReportModel = require('./models/user_report_model');
const AdminRegistrationModel = require('./models/admin_registration_model');
const db = require('./config/db');
const axios = require("axios");

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    axios.get("https://mosquinator-backend-20075696f4d1.herokuapp.com")
    .then(function (response) {
        res.header("Access-Control-Allow-Origin", "https://www.mosquinator.online"); 
        res.send("Hello");
      })
      .catch(function (error) {
        console.log(error);
    });
})


app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
})