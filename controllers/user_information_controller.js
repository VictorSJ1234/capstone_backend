const UserInformationService = require('../services/user_information_services');
const { encryptData, decryptData } = require('../data_encryption/data_encryption');
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { name, birthday, gender, contact_number, street_name, house_number, floor, building_name, barangay, district, city, uploaded_file, email, password, profilePicture, postedDate, accountStatus } = req.body;

        // Encrypt the sensitive data
        const encryptedName = encryptData(name);
        const encryptedBirthday = encryptData(birthday);
        const encryptedGender = encryptData(gender);
        const encryptedContactNumber = encryptData(contact_number);
        const encryptedBarangay = encryptData(barangay);
        const encryptedEmail = encryptData(email);
        const encryptedStreetName = encryptData(street_name);
        const encryptedHouseNumber = encryptData(house_number);
        const encryptedFloor = encryptData(floor);
        const encryptedBuildingName = encryptData(building_name);
        const encryptedDistrict = encryptData(district);
        const encryptedCity = encryptData(city);
        //const encryptedPicture = encryptData(profilePicture);
        const encryptedStatus = encryptData(accountStatus);
        // Encrypt each element of the uploaded_file array
       //const encryptedUploadedFiles = uploaded_file.map(file => encryptData(file));

        const dateReported = postedDate ? new Date(postedDate) : new Date();


        try {
            const successRes = await UserInformationService.registerUser(

                /** 
                name,
                birthday,
                gender,
                contact_number,
                street_name,
                house_number,
                floor,
                building_name,
                barangay,
                district,
                city,
                email,
                password,
                profilePicture
                */

                encryptedName,
                encryptedBirthday,
                encryptedGender, 
                encryptedContactNumber,
                encryptedStreetName,
                encryptedHouseNumber,
                encryptedFloor,
                encryptedBuildingName,
                encryptedBarangay,
                encryptedDistrict,
                encryptedCity,
                uploaded_file,
                encryptedEmail,
                password, 
                profilePicture,
                dateReported,
                encryptedStatus
                
            );
            res.json({ status: true, success: "User Registered Successfully" });
        } catch (error) {
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


        //checks if the email and password are provided
        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }

         // Find a user in the database by their encrypted email
        const user = await UserInformationService.checkUser(encryptData(email)); 

        //if user does not exist //cannot find the requested data
        if (!user) {
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User does not exist' });
        }


        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await user.comparePassword(password);


        // If the password is incorrect, return a 401 error
        if (isPasswordCorrect === false) {
            // Custom error code for "Username or Password does not match"
            return res.status(401).json({ error: "INVALID_CREDENTIALS", message: 'Username or Password does not match' });
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };
    
        
        const token = await UserInformationService.generateAccessToken(tokenData,"secret","360d")


        // Send a success response with the token
        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');

        // Additional error code for "Login and Password do not match"
        if (error.message === 'Login and Password do not match') {
            return res.status(401).json({ error: "INVALID_CREDENTIALS", message: 'Username or Password does not match' });
        }

        next(error);
    }
};

// get user report
exports.getUserData = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const userInformationData = await UserInformationService.getUserData(_id);

        if (userInformationData.length === 0) {
            // No reports found for the user, return an empty array
            res.json({ status: true, userInformationData: [] });
            return;
        }

        // Decrypt the sensitive data for each report
        const decryptedUserInformation = userInformationData.map(userData => {
            const decryptedName = decryptData(userData.name);
            const decryptedBirthday = decryptData(userData.birthday);
            const decryptedGender = decryptData(userData.gender);
            const decryptedContactNumber = decryptData(userData.contact_number);
            const decryptedStreetName = decryptData(userData.street_name);
            const decryptedHouseNumber = decryptData(userData.house_number);
            const decryptedFloor = decryptData(userData.floor);
            const decryptedBuildingName = decryptData(userData.building_name);
            const decryptedBarangay = decryptData(userData.barangay);
            const decryptedDistrict = decryptData(userData.district);
            const decryptedCity = decryptData(userData.city);
            const decryptedEmail = decryptData(userData.email);
            const decryptedStatus = decryptData(userData.accountStatus);

            return {
                _id: userData._id,
                name: decryptedName,
                birthday: decryptedBirthday,
                gender: decryptedGender,
                contact_number: decryptedContactNumber,
                street_name: decryptedStreetName,
                house_number: decryptedHouseNumber,
                floor: decryptedFloor,
                building_name: decryptedBuildingName,
                barangay: decryptedBarangay,
                district: decryptedDistrict,
                city: decryptedCity,
                uploaded_file: userData.uploaded_file,
                email: decryptedEmail,
                profilePicture: userData.profilePicture,
                postedDate: userData.postedDate,
                accountStatus: decryptedStatus,
                password: userData.password
            };
        });

        res.json({ status: true, userInformationData: decryptedUserInformation });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


// get all user data
// get all user data
exports.getAllUserData = async (req, res, next) => {
    try {
        const allUserData = await UserInformationService.getAllUserData();

        // Decrypt the sensitive data for each user
        const decryptedUserData = allUserData.map(userData => {
            const decryptedName = decryptData(userData.name);
            const decryptedBirthday = decryptData(userData.birthday);
            const decryptedGender = decryptData(userData.gender);
            const decryptedContactNumber = decryptData(userData.contact_number);
            const decryptedStreetName = decryptData(userData.street_name);
            const decryptedHouseNumber = decryptData(userData.house_number);
            const decryptedFloor = decryptData(userData.floor);
            const decryptedBuildingName = decryptData(userData.building_name);
            const decryptedBarangay = decryptData(userData.barangay);
            const decryptedDistrict = decryptData(userData.district);
            const decryptedCity = decryptData(userData.city);
            const decryptedEmail = decryptData(userData.email);
            const decryptedStatus = decryptData(userData.accountStatus);
            

            return {
                _id: userData._id,
                name: decryptedName,
                birthday: decryptedBirthday,
                gender: decryptedGender,
                contact_number: decryptedContactNumber,
                street_name: decryptedStreetName,
                house_number: decryptedHouseNumber,
                floor: decryptedFloor,
                building_name: decryptedBuildingName,
                barangay: decryptedBarangay,
                district: decryptedDistrict,
                city: decryptedCity,
                uploaded_file: userData.uploaded_file, 
                email: decryptedEmail,
                profilePicture: userData.profilePicture,
                postedDate: userData.postedDate,
                accountStatus: decryptedStatus,
            };
        });

        res.json({ status: true, allUserData: decryptedUserData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};



exports.deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.body;

        // Perform the deletion operation
        const deletedUser = await UserInformationService.deleteUser(_id);

        if (!deletedUser) {
            // Cannot find the requested user to delete
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User not found' });
        }

        res.json({ status: true, success: "User deleted successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.editUserStatus = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the user's _id from the frontend
        const {
            accountStatus,
        } = req.body;

        // Encrypt the updated data
        const updatedData = {
            accountStatus: encryptData(accountStatus),
        };

        // Update the user account in the database
        await UserInformationService.updateUserStatus(_id, updatedData);

        res.json({ status: true, success: "User account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.editUser = async (req, res, next) => {
    try {
        const { _id } = req.params; // Get the user's _id from the frontend
        const {
            name,
            birthday,
            gender,
            contact_number,
            street_name,
            house_number,
            floor,
            building_name,
            barangay,
            district,
            city,
            email,
            profilePicture,
        } = req.body;

        // Encrypt the updated data
        const updatedData = {
            name: encryptData(name),
            birthday: encryptData(birthday),
            gender: encryptData(gender),
            contact_number: encryptData(contact_number),
            street_name: encryptData(street_name),
            house_number: encryptData(house_number),
            floor: encryptData(floor),
            building_name: encryptData(building_name),
            barangay: encryptData(barangay),
            district: encryptData(district),
            city: encryptData(city),
            email: encryptData(email),
            profilePicture: profilePicture,
        };

        // Update the user account in the database
        await UserInformationService.updateUser(_id, updatedData);

        res.json({ status: true, success: "User account updated successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

// Get total number of user_information records
exports.getTotalUserInformationCount = async (req, res, next) => {
    try {
        const totalCount = await UserInformationService.getTotalUserInformationCount();
        res.json({ status: true, totalCount });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.countUsersByBarangay = async (req, res, next) => {
    try {
        const { barangay } = req.body; 

        // Call the new function to count users by barangay
        const count = await UserInformationService.countUsersByBarangay(encryptData(barangay));

        res.json({ status: true, count });
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

        const user = await UserInformationService.getUserData(_id);

        if (!user) {
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User does not exist' });
        }

        // Verify the old password
        const isPasswordCorrect = await user[0].comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "INVALID_PASSWORD", message: 'Old password is incorrect' });
        }

        // Validate the new password (you can reuse your existing validation logic)
        if (!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{10,}$/)) {
            return res.status(400).json({
                error: "INVALID_PASSWORD_FORMAT",
                message: "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (.@$!%*?&)."
            });
        }

        // Hash the new password and update it in the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        await UserInformationService.updatePassword(_id, hash);

        res.json({ status: true, success: "Password changed successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ error: "EMAIL_MISSING", message: "Email is required" });
        }

        // Find the user in the database by their email
        const user = await UserInformationService.checkUser(encryptData(email));

        if (!user) {
            return res.status(404).json({ error: "USER_NOT_FOUND", message: 'User does not exist' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        await UserInformationService.updatePassword(user._id, hash);

        res.json({ status: true, success: "Password reset successfully" });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};

//handle request and response