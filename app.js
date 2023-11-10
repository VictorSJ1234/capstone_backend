const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const UserRoute = require("./routers/user_information_router");
const UserReportRoute = require("./routers/user_report_router");
const AdminRegistrationRoute = require("./routers/admin_registration_router");
const AdminResponseRoute = require("./routers/admin_response_routers");
const CommunityProjectRoute = require("./routers/community_projects_router");
const ReportToBarangayRoute = require("./routers/report_to_barangay_router");
const DenguePostRoute = require("./routers/dengue_post_router");
const CommunityProjectNotificationRoute = require("./routers/community_projects_notification_router");
const BarangayResponseRoute = require("./routers/barangay_response_router");
const AdminResponseToBarangayRoute = require("./routers/admin_response_to_barangay_router");
const InquiryRoute = require("./routers/inquiry_routes");
const AdminNotificationRoute = require("./routers/admin_notifications_router");

const app = express();
app.use(cors());

// Set the body-parser middleware with the increased limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/",UserRoute);
app.use("/",UserReportRoute);
app.use("/",AdminRegistrationRoute);
app.use("/",AdminResponseRoute);
app.use("/",CommunityProjectRoute);
app.use("/",ReportToBarangayRoute);
app.use("/",DenguePostRoute);
app.use("/",CommunityProjectNotificationRoute);
app.use("/",BarangayResponseRoute);
app.use("/",AdminResponseToBarangayRoute);
app.use("/",InquiryRoute);
app.use("/",AdminNotificationRoute)

module.exports = app;