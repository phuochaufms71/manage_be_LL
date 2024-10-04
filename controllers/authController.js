import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { handleResponseError, handleResponseSuccess } from '../utils/response.js';
import cloudinary from '../utils/cloudinary.js';

dotenv.config();
const saltRound = 10;
const generateAccessToken = (code, password, role) => {
    return jwt.sign({code, password, role}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '2d'})
}

//hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRound)
}

//compare password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

//register
export const register = async (req, res) => {
    const { code, firstName, lastName, phone, email, password } = req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
        handleResponseError(res, 400, "Bab request. All fields are required")
        return
    }

    const existedCode = await User.findOne({code});
    if(existedCode) {
        handleResponseError(res, 400, "Code is existed")
        return
    }

    const newUser = await User.create({ code, firstName, lastName, phone, email, password: await hashPassword(password) });
    handleResponseSuccess(res, 201, "Register successfully", {
        code,
        firstName,
        lastName,
        phone,
        email,
        role: newUser.role,
        avatar: newUser.avatar
    })
}

//login
export const login = async (req, res) => {
    const { code, password } = req.body;
    if (!code || !password) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    const checkCodeUser = await User.findOne({code});
    if (!checkCodeUser) {
        handleResponseError(res, 400, "Code is incorrect")
        return
    }

    const checkPasswordUser = await comparePassword(password, checkCodeUser.password);
    if (!checkPasswordUser) {
        handleResponseError(res, 400, "Password is incorrect")
        return
    }

    const accessToken = generateAccessToken(code, checkCodeUser.password, checkCodeUser.role);
    handleResponseSuccess(res, 200, "Login successfully", {
        code,
        accessToken,
        role: checkCodeUser.role,
        avatar: checkCodeUser.avatar,
        phone: checkCodeUser.phone,
        firstName: checkCodeUser.firstName,
        lastName: checkCodeUser.lastName,
    })
}

//change password
export const changePassword = async (req, res) => {
    const { code, password, newPassword } = req.body;
    if (!code || !password || !newPassword) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    const checkCodeUser = await User.findOne({code});
    if (!checkCodeUser) {
        handleResponseError(res, 400, "Code is incorrect")
        return
    }
    
    const checkPasswordUser = await comparePassword(password, checkCodeUser.password);
    if (!checkPasswordUser) {
        handleResponseError(res, 400, "Password is incorrect")
        return
    }
    const hashedNewPassword = await hashPassword(newPassword);
    await User.findOneAndUpdate({code}, { $set: { password: hashedNewPassword}}, {role: checkEmailUser.role})
     
    handleResponseSuccess(res, 200, "Change password successfully")
}

//reset password
export const resetPassword = async (req, res) => {
    const { code, newPassword } = req.body;

    const checkCodeUser = await User.findOne({code});
    if (!checkCodeUser) {
        handleResponseError(res, 400, "Code is incorrect")
        return
    }

    const hashedNewPassword = await hashPassword(newPassword)
    await User.findOneAndUpdate({code}, { $set: { password: hashedNewPassword}}, {role: checkCodeUser.role})
    handleResponseSuccess(res, 200, "Reset password successfully")
}

//logout
export const logout = (req, res) => {
    handleResponseSuccess(res, 200, "Logout successfully")
}

export const getUser = async (req, res) => {
    const user = await User.find();
    handleResponseSuccess(res, 200, "Get user successfully", user )
}
