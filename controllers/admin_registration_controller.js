const adminRegistrationService = require('../services/admin_registration_services');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const AdminRegistrationService = require('../services/admin_registration_services');
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { fullname, gender, birthday, contact_number, office, selected_role, email, uploaded_file, password, adminProfilePicture, official_role, postedDate, accountStatus } = req.body;

        const defaultOfficialRole = "User";
        const defaultAccountStatus = "not Validated";

        const dateReported = postedDate ? new Date(postedDate) : new Date();

        try {
            const successRes = await adminRegistrationService.registerAdmin(
                fullname,
                gender,
                birthday,
                contact_number,
                office,
                selected_role,
                email,
                uploaded_file,
                password,
                adminProfilePicture,
                defaultOfficialRole,
                dateReported,
                defaultAccountStatus
            );
            res.json({ status: true, success: "User Registered Successfully" });
        } catch (error) {
            // Handle specific error for duplicate email or username
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                res.status(400).json({ error: "Email must be unique." });
            } else {
                throw error;
            }
        }
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        const user = await adminRegistrationService.checkUser(email); 
        if (!user) {
            //cannot find the requested data
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User does not exist' });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            // Custom error code for "Username or Password does not match"
            return res.status(401).json({ error: "INVALID_CREDENTIALS", message: 'Username or Password does not match' });
        }

        // Decrypt the role
    const decryptedRole = user.official_role;

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email, official_role: decryptedRole };
    

        const token = await adminRegistrationService.generateAccessToken(tokenData,"secret","360d")

        res.status(200).json({ status: true, success: "sendData", token: token, official_role: decryptedRole, _id: user._id   });
    } catch (error) {
        console.log(error, 'err---->');

        // Additional error code for "Login and Password do not match"
        if (error.message === 'Login and Password do not match') {
            return res.status(401).json({ error: "INVALID_CREDENTIALS", message: 'Username or Password does not match' });
        }

        next(error);
    }
};

// get admin report
exports.getAdminData = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const userAdminData = await adminRegistrationService.getAdminData(_id);

        if (userAdminData.length === 0) {
            res.json({ status: true, userAdminData: [] });
            return;
        }

        const adminDataWithoutDecryption = userAdminData.map(adminData => ({
            _id: adminData._id,
            fullname: adminData.fullname,
            gender: adminData.gender,
            birthday: adminData.birthday,
            contact_number: adminData.contact_number,
            office: adminData.office,
            selected_role: adminData.selected_role,
            email: adminData.email,
            uploaded_file: adminData.uploaded_file,
            adminProfilePicture: adminData.adminProfilePicture,
            official_role: adminData.official_role,
            postedDate: adminData.postedDate,
            accountStatus: adminData.accountStatus,
            password: adminData.password
        }));

        res.json({ status: true, userAdminData: adminDataWithoutDecryption });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



//get all admn date
exports.getAllAdminData = async (req, res, next) => {
    try {
        const allAdminData = await adminRegistrationService.getAllAdminData();

        const adminDataWithoutDecryption = allAdminData.map(adminData => ({
            _id: adminData._id,
            fullname: adminData.fullname,
            gender: adminData.gender,
            birthday: adminData.birthday,
            contact_number: adminData.contact_number,
            office: adminData.office,
            selected_role: adminData.selected_role,
            email: adminData.email,
            uploaded_file: adminData.uploaded_file,
            adminProfilePicture: adminData.adminProfilePicture,
            official_role: adminData.official_role,
            postedDate: adminData.postedDate,
            accountStatus: adminData.accountStatus,
        }));

        res.json({ status: true, allAdminData: adminDataWithoutDecryption });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.deleteAdmin = async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Perform the deletion operation
        const deletedAdmin = await adminRegistrationService.deleteAdmin(_id);

        if (!deletedAdmin) {
            // Cannot find the requested admin to delete
            return res.status(404).json({ error: "ADMIN_NOT_FOUND", message: 'Admin not found' });
        }

        res.json({ status: true, success: "Admin deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.editAdmin = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the admin's _id from the frontend
        console.log('_id:', _id);
        const {
            fullname,
            gender,
            birthday,
            contact_number,
            office,
            email,
            adminProfilePicture,
            official_role
        } = req.body;

        const updatedData = {
            fullname: fullname,
            gender: gender,
            birthday: birthday,
            contact_number: contact_number,
            office: office,
            email: email,
            adminProfilePicture: adminProfilePicture,
            official_role: official_role,
        };

        console.log('updatedData:', updatedData);

        await adminRegistrationService.updateAdmin(_id, updatedData);

        res.json({ status: true, success: "Admin account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



exports.editAdminRole = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the admin's _id from the frontend
        console.log('_id:', _id);
        const {
            official_role,
            accountStatus
        } = req.body;

        // Encrypt the updated data
        const updatedData = {
            official_role: official_role,
            accountStatus: accountStatus,

        };

        console.log('updatedData:', updatedData);

        // Update the admin account in the database
        await adminRegistrationService.updateAdmin(_id, updatedData);

        res.json({ status: true, success: "Admin account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get total number of user_information records
exports.getTotalAdminInformationCount = async (req, res, next) => {
    try {
        const totalCount = await AdminRegistrationService.getTotalAdminInformationCount();
        res.json({ status: true, totalCount });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { password, newPassword } = req.body;

        console.log('_id:', _id);
        console.log('_id:', password);
        console.log('_id:', newPassword);

        const user = await adminRegistrationService.getAdminData(_id);

        if (!user) {
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User does not exist' });
        }

        // Verify the old password
        const isPasswordCorrect = await user[0].comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "INVALID_PASSWORD", message: 'Old password is incorrect' });
        }

        // Validate the new password (you can reuse your existing validation logic)
        if (!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.!@#$%^&*_-])[A-Za-z\d.!@#$%^&*_-]{10,}$/)) {
            return res.status(400).json({
                error: "INVALID_PASSWORD_FORMAT",
                message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)."
            });
        }

        // Hash the new password and update it in the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await adminRegistrationService.updatePassword(_id, hash);

        res.json({ status: true, success: "Password changed successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        console.log(email, newPassword);

        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ error: "EMAIL_MISSING", message: "Email is required" });
        }

        // Find the user in the database by their email
        const user = await adminRegistrationService.checkUser(email);

        if (!user) {
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User does not exist' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        await adminRegistrationService.updatePassword(user._id, hash);

        res.json({ status: true, success: "Password reset successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

//handle request and response