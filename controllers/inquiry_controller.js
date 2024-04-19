const InquiryService = require('../services/inquiry_services'); 
const InquiryModel = require('../models/inquiry_model');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const nodemailer = require('nodemailer');

// Create a new community report
exports.createInquiry = async (req, res, next) => {
    try {
        const { email, subject, uploaded_file, inquiry, date_created} = req.body;

        const dateCreated = date_created ? new Date(date_created) : new Date();

        // Data to be transferred to the database
        const inquiryData = await InquiryService.createInquiry(
            email, subject, uploaded_file, inquiry, date_created
        );

        res.json({ status: true, success: "Inquiry Created Successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



// get user report
exports.getInquiry = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const inquiryData = await InquiryService.getInquiry(_id);

        if (inquiryData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, inquiryData: [] });
            return;
        }
        res.json({ status: true, inquiryData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get all community project data
exports.getAllInquiries = async (req, res, next) => {
    try {
        const allInquiries = await InquiryService.getAllInquiry();

        if (allInquiries.length === 0) {
            // No community projects found, return an empty array
            res.json({ status: true, inquiryData: [] });
            return;
        }

        res.json({ status: true, inquiryData: allInquiries });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

//edit inquiry
exports.editProject = async (req, res, next) => {
    try {
        const { _id } = req.params;
        console.log('_id:', _id); 
        const { email, subject, uploaded_file, inquiry, date_created} = req.body;


        const updatedData = {
            email, subject, uploaded_file, inquiry, date_created 
        };

        console.log('updatedData:', updatedData);

        // Update the admin account in the database
        await InquiryService.updateProject(_id, updatedData);

        res.json({ status: true, success: "Admin account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.deleteInquiry = async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Perform the deletion operation
        const deleteProject = await InquiryService.deleteInquiry(_id);

        if (!deleteProject) {
            // Cannot find the requested report to delete
            return res.status(404).json({ error: "REPORT_NOT_FOUND", message: 'Report not found' });
        }

        res.json({ status: true, success: "Inquiry deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.InquiryResponse = async (req, res, next) => {
    try {
        const { email, response_subject, inquiry_response } = req.body;


        // Send an email with the response
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            secure: true,
            auth: {
                user: 'inno.geeks.capstone@gmail.com',
                pass: 'mqew nmkl fzai ffcr ',
            },
            tls: {
                rejectUnauthorized: false, // Add this line
            },
        });

        // Email content
        const mailOptions = {
            from: 'inno.geeks.capstone@gmail.com',
            to: email, 
            subject: response_subject,
            text: inquiry_response, //
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error);
                res.status(500).json({ status: false, error: 'Email not sent' });
            } else {
                console.log('Email sent: ' + info.response);
                // Continue with your existing response
                res.json({ status: true, success: "Inquiry Created Successfully" });
            }
        });

    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.getTotalUserInquiryCount = async (req, res, next) => {
    try {
        const totalCount = await InquiryService.getTotalUserInquiryCount();
        res.json({ status: true, totalCount });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};