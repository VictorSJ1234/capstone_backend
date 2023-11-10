const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const db = require('../config/db');
const { Schema } = mongoose;

const adminRegistrationSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "This field is required"],
    },
    gender: {
        type: String,
        required: [true, "This field is required"],
    },
    birthday: {
        type: String,
        required: [true, "This field is required"],
    },
    contact_number: {
        type: String,
        required: [true, "This field is required"],
    },
    office: {
        type: String,
        required: [true, "This field is required"],
    },
    selected_role: {
        type: String,
        required: [true, "This field is required"],
    },
    email: {
        type: String,
        required: [true, "This field is required"],
        unique: true,
    },  
    uploaded_file: {
        type: [String],
    },
    password: {
        type: String,
        required: [true, "This field is required"],
        match: [
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.!@#$%^&*_-])[A-Za-z\d.!@#$%^&*_-]{10,}$/,
            "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (.@$!%*?&).",
        ],
    },    
    adminProfilePicture: {
        type: String, 
        required: [true, "This field is required"],
    }, 
    official_role: {
        type: String,
        required: [true, "This field is required"],
    },  
    postedDate: { 
        type: Date,
        default: Date.now 
    },
    accountStatus: { 
        type: String,
    }
});

// password hashing function
adminRegistrationSchema.pre("save", async function() {
    var user = this;
    if (!user.isModified("password")) {
        return; // If the password is not modified, proceed with saving
    }
    try {
        // Generate a salt and hash the user's password
        const salt = await bcrypt.genSalt(10); // 10 is the saltRounds
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash; // Store the hashed password in the user object
    } catch (err) {
        throw err; // If an error occurs during the hashing process, throw it
    }
});

  
//used while signIn decrypt
adminRegistrationSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log('----------------no password',this.password, this.email);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


const AdminRegistrationModel = db.model('admin_information', adminRegistrationSchema);

module.exports = AdminRegistrationModel;
