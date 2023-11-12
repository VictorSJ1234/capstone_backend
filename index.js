const app = require("./app");
const UserModel = require('./models/user_information_model');
const UserReportModel = require('./models/user_report_model');
const AdminRegistrationModel = require('./models/admin_registration_model');
const db = require('./config/db');

const corsOptions = {
    origin: 'https://www.mosquinator.online', // Replace with the actual URL of your Angular app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
  
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
})