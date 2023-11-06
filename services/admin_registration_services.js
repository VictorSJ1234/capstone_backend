const AdminRegistrationModel = require('../models/admin_registration_model');
const jwt = require("jsonwebtoken");

class AdminRegistrationService{
    // Function to register a new admin
    static async registerAdmin(fullname, gender, birthday, contact_number, office, selected_role, email, uploaded_file, password, adminProfilePicture, official_role, postedDate, accountStatus){
        try{
            // Create a new admin document with the provided data
            const createUser = new AdminRegistrationModel({fullname, gender, birthday, contact_number, office, selected_role, email, uploaded_file, password, adminProfilePicture, official_role, postedDate, accountStatus});
            // Save the new user to the database
            return await createUser.save();

        }
        catch(err){
            throw err;
        }
    }

    // Function to check if a admin with a given email exists
    static async checkUser(email){
        try {
            // Find a admin in the database based on their email
            return await AdminRegistrationModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    // Function to generate a JSON Web Token (JWT)
    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }

   // Function to get admin data by their _id
    static async getAdminData(_id) {
        // Retrieve user information based on the _id
        const adminInformationList = await AdminRegistrationModel.find({ _id }).exec();
        return adminInformationList;
    }

    // Function to get data for all users
    static async getAllAdminData() {
        try {
            // Retrieve data for all users in the database
            return await AdminRegistrationModel.find();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete an admin by their _id
    static async deleteAdmin(_id) {
        try {
            // Delete the admin based on their _id
            const deletedAdmin = await AdminRegistrationModel.findByIdAndDelete(_id).exec();
            return deletedAdmin;
        } catch (error) {
            throw error;
        }
    }

    // Function to update admin account by _id
    static async updateAdmin(_id, updatedData) {
        try {
            // Update the admin based on their _id with the new data from the controller
            await AdminRegistrationModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to update admin role by _id
    static async updateAdminRole(_id, updatedData) {
        try {
            // Update the admin based on their _id with the new data from the controller
            await AdminRegistrationModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to get the total count of user_information
    static async getTotalAdminInformationCount() {
        try {
            const totalCount = await AdminRegistrationModel.countDocuments().exec();
            return totalCount;
        } catch (error) {
            throw error;
        }
    }

    static async updatePassword(_id, newPassword) {
        try {
            // Update the user's password in the database
            await AdminRegistrationModel.findByIdAndUpdate(_id, { password: newPassword }).exec();
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = AdminRegistrationService;


//this folder will perform database operations