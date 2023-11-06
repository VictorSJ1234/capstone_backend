const adminRegistrationService = require('../services/admin_registration_services');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const AdminRegistrationService = require('../services/admin_registration_services');
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { fullname, gender, birthday, contact_number, office, selected_role, email, uploaded_file, password, adminProfilePicture, official_role, postedDate, accountStatus} = req.body;

            // Add console.log statements to check the values of variables
            console.log("fullname:", fullname);
            console.log("gender:", gender);
            console.log("birthday:", birthday);
            console.log("contact_number:", contact_number);
            console.log("office:", office);
            console.log("selected_role:", selected_role);
            console.log("email:", email);
            console.log("uploaded_file:", uploaded_file);
            console.log("password:", password);
            console.log("adminProfilePicture:", adminProfilePicture);
            console.log("official_role:", official_role);
            console.log("postedDate:", postedDate);


            const defaultOfficialRole = "User"; 
            const defaultAccountStatus = "not Validated";

            // Encrypt the sensitive data
            const encryptedFullname = encryptData(fullname);
            const encryptedGender = encryptData(gender);
            const encryptedBirthday = encryptData(birthday);
            const encryptedContactNumber = encryptData(contact_number);
            const encryptedOffice = encryptData(office);
            const encryptedSelectedRole = encryptData(selected_role);
            const encryptedEmail = encryptData(email);
            const encryptedRole = encryptData(defaultOfficialRole);
            const encryptedStatus = encryptData(defaultAccountStatus);

            const dateReported = postedDate ? new Date(postedDate) : new Date();

            try {
                // Data that will be transferred to the database
                const successRes = await adminRegistrationService.registerAdmin(
                    encryptedFullname,
                    encryptedGender,
                    encryptedBirthday,
                    encryptedContactNumber,
                    encryptedOffice,
                    encryptedSelectedRole,
                    encryptedEmail,
                    uploaded_file, // No need to encrypt files
                    password, // Already hashed
                    adminProfilePicture, // No need to encrypt profile picture
                    encryptedRole,
                    dateReported,
                    encryptedStatus
                );
                res.json({ status: true, success: "User Registered Successfully" });
            } catch (error) {
                // Handle specific error for duplicate email or username
                if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                    res.status(400).json({ error: "Email must be unique." });
                }else {
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
        const user = await adminRegistrationService.checkUser(encryptData(email)); 
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
    const decryptedRole = decryptData(user.official_role);

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
            // No reports found for the user, return an empty array
            res.json({ status: true, userAdminData: [] });
            return;
        }

        // Decrypt data for each report
        const decryptAdminInformation = userAdminData.map(adminData => {
            const decryptedFullname = decryptData(adminData.fullname);
            const decryptedGender = decryptData(adminData.gender);
            const decryptedBirthday = decryptData(adminData.birthday);
            const decryptedContactNumber = decryptData(adminData.contact_number);
            const decryptedOffice = decryptData(adminData.office);
            const decryptedSelectedRole = decryptData(adminData.selected_role);
            const decryptedEmail = decryptData(adminData.email);
            const decryptedOfficialRole = decryptData(adminData.official_role);
            const decryptedPostedDate = adminData.postedDate;
            const decryptedStatus = decryptData(adminData.accountStatus);

            // Data that will be fetched and shown in the UI
            return {
                _id: adminData._id,
                fullname: decryptedFullname,
                gender: decryptedGender,
                birthday: decryptedBirthday,
                contact_number: decryptedContactNumber,
                office: decryptedOffice,
                selected_role: decryptedSelectedRole,
                email: decryptedEmail,
                uploaded_file: adminData.uploaded_file,
                adminProfilePicture: adminData.adminProfilePicture,
                official_role: decryptedOfficialRole,
                postedDate: decryptedPostedDate,
                accountStatus: decryptedStatus,
                password: adminData.password
            };
        });

        res.json({ status: true, userAdminData: decryptAdminInformation });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


//get all admn date
exports.getAllAdminData = async (req, res, next) => {
    try {
        const allAdminData = await adminRegistrationService.getAllAdminData();

        // Decrypt data for each report
        const decryptAdminInformation = allAdminData.map(adminData => {
            const decryptedFullname = decryptData(adminData.fullname);
            const decryptedGender = decryptData(adminData.gender);
            const decryptedBirthday = decryptData(adminData.birthday);
            const decryptedContactNumber = decryptData(adminData.contact_number);
            const decryptedOffice = decryptData(adminData.office);
            const decryptedSelectedRole = decryptData(adminData.selected_role);
            const decryptedEmail = decryptData(adminData.email);
            const decryptedOfficialRole = decryptData(adminData.official_role);
            const decryptedPostedDate = adminData.postedDate;
            const decryptedStatus = decryptData(adminData.accountStatus);

            // Data that will be fetched and shown in the UI
            return {
                _id: adminData._id,
                fullname: decryptedFullname,
                gender: decryptedGender,
                birthday: decryptedBirthday,
                contact_number: decryptedContactNumber,
                office: decryptedOffice,
                selected_role: decryptedSelectedRole,
                email: decryptedEmail,
                uploaded_file: adminData.uploaded_file,
                adminProfilePicture: adminData.adminProfilePicture,
                official_role: decryptedOfficialRole,
                postedDate: decryptedPostedDate,
                accountStatus: decryptedStatus,
            };
        });

        res.json({ status: true, allAdminData: decryptAdminInformation });
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

        // Encrypt the updated data
        const updatedData = {
            fullname: encryptData(fullname),
            gender: encryptData(gender),
            birthday: encryptData(birthday),
            contact_number: encryptData(contact_number),
            office: encryptData(office),
            email: encryptData(email),
            adminProfilePicture: adminProfilePicture,
            official_role: encryptData(official_role),
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
            official_role: encryptData(official_role),
            accountStatus: encryptData(accountStatus),

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
        if (!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
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
        const user = await adminRegistrationService.checkUser(encryptData(email));

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