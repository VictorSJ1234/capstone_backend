const UserModel = require('../models/user_information_model');
const UserReportModel = require('../models/user_report_model');
const jwt = require("jsonwebtoken");

class UserInformationService{
    static async registerUser(name, birthday, gender, contact_number, street_name, house_number, floor, building_name, barangay, district, city, uploaded_file, email, password, profilePicture, postedDate, accountStatus){
        try{
            const createUser = new UserModel({name, birthday, gender, contact_number, street_name, house_number, floor, building_name, barangay, district, city, uploaded_file, email, password, profilePicture, postedDate, accountStatus});
            return await createUser.save();

        }
        catch(err){
            throw err;
        }
    }

    static async checkUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }

    //get user data
    static async getUserData(_id) {
        const userInformationList = await UserModel.find({ _id }).exec();
        return userInformationList;
    }

    //get all user
    static async getAllUserData() {
        try {
            return await UserModel.find();
        } catch (error) {
            throw error;
        }
    }

    // Function to delete a user by their _id
    static async deleteUser(_id) {
        try {
            // First, find the user to be deleted
            const user = await UserModel.findById(_id).exec();

            if (!user) {
                // If the user does not exist, return null
                return null;
            }

            // Delete the user's reports first
            await UserReportModel.deleteMany({ userId: user._id }).exec();

            // Then, delete the user based on their _id
            const deletedUser = await UserModel.findByIdAndDelete(_id).exec();

            return deletedUser;
        } catch (error) {
            throw error;
        }
    }

     // Function to update user account status by _id
     static async updateUserStatus(_id, updatedData) {
        try {
            // Update the user based on their _id with the new data
            await UserModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }


    // Function to update user account by _id
    static async updateUser(_id, updatedData) {
        try {
            // Update the user based on their _id with the new data
            await UserModel.findByIdAndUpdate(_id, updatedData).exec();
        } catch (error) {
            throw error;
        }
    }

    // Function to get the total count of user_information
    static async getTotalUserInformationCount() {
        try {
            const totalCount = await UserModel.countDocuments().exec();
            return totalCount;
        } catch (error) {
            throw error;
        }
    }

    // Add a new function to count users by barangay
    static async countUsersByBarangay(barangay) {
        try {
            const count = await UserModel.countDocuments({ barangay }).exec();
            return count;
        } catch (error) {
            throw error;
        }
    }

    static async updatePassword(_id, newPassword) {
        try {
            // Update the user's password in the database
            await UserModel.findByIdAndUpdate(_id, { password: newPassword }).exec();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserInformationService;


//this folder will perform database operations