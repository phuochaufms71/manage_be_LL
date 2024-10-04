import mongoose from "mongoose";
import Student from "../models/studentModel.js"
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";
import cloudinary from "../utils/cloudinary.js";

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        handleResponseSuccess(res, 200, "Get student successfully", { ...students })
    } catch (error) {
        handleResponseError(res, 500, "Lỗi máy chủ")
        return
    }
}

export const getStudentDetail = async (req, res) => {
    const { id } = req.params;
    
    const checkStudentByIdInDb = await Student.findById(id);
    if (!checkStudentByIdInDb) {
        handleResponseError(res, 404, "Student không tồn tại")
        return
    }
    handleResponseSuccess(res, 200, "Get student successfully", {
        _id: checkStudentByIdInDb._id,
        code: checkStudentByIdInDb.code,
        classes: checkStudentByIdInDb.classes,
        firstName: checkStudentByIdInDb.firstName,
        lastName: checkStudentByIdInDb.lastName,
        block: checkStudentByIdInDb.block,
        placeBirth: checkStudentByIdInDb.placeBirth,
        schoolYear: checkStudentByIdInDb.schoolYear,
        birthday: checkStudentByIdInDb.birthday,
        sex: checkStudentByIdInDb.sex,
        address: checkStudentByIdInDb.address,
        phone: checkStudentByIdInDb.phone,
        email: checkStudentByIdInDb.email,
        image: checkStudentByIdInDb.image
    })
}

export const createStudent = async (req, res) => {
    const { code, classes, firstName, lastName, birthday, sex, block, placeBirth, address, phone, email, schoolYear, image } = req.body;

    if ( !code || !classes || !firstName || !lastName || !sex || !block || !address || !phone || !email || !schoolYear) {
        handleResponseError(res, 404, "Tất cả trường đều bắt buộc")
        return
    }

    const newStudent = await Student.create({ code, classes, firstName, lastName, birthday, sex, block, placeBirth, schoolYear, phone, address, email });
    handleResponseSuccess(res, 201, "Tạo học sinh thành công", { ...newStudent._doc})

}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Id không đúng")
        return
    }
    const checkStudentByIdInDb = await Student.findById(id);
    if (!checkStudentByIdInDb) {
        handleResponseError(res, 404, "Học sinh không tồn tại")
        return
    }
    const { code, classes, firstName, lastName, birthday, sex, block, placeBirth, address, phone, email, schoolYear, image } = req.body;
    
    if ( !code || !classes || !firstName || !lastName || !birthday || !sex || !block || !placeBirth || !address || !phone || !email || !schoolYear) {
        handleResponseError(res, 404, "Tất cả trường đều bắt buộc")
        return
    }

    if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
            upload_preset: "manage-student"
        })

        if (uploadRes) {
            await checkStudentByIdInDb.updateOne({ code, classes, firstName, lastName, birthday, sex, block, placeBirth, schoolYear, image: uploadRes, phone, address, email })
            const updateStudent = await Student.findById(id);
            handleResponseSuccess(res, 200, "Chỉnh sửa học sinh thành công", { ...updateStudent._doc})
        }
    }
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Id không tồn tại")
        return
    }
    const checkStudentByIdInDb = await Student.findById(id)
    if (!checkStudentByIdInDb) {
        handleResponseError(res, 404, "Học sinh không tồn tại")
        return
    }
    await Student.findByIdAndDelete(id)
    handleResponseSuccess(res, 200, "Xóa học sinh thành công")
}

export const editStudent = async (req, res) => {
    const { code, firstName, lastName, sex, birthday, placeBirth, classes, phone, email, address } = req.body;
    if (!code || !firstName || !lastName || !sex || !birthday || !placeBirth || !classes || !phone || !email || !address) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    const checkCodeStudent = await Student.findOne({code});
    if (!checkCodeStudent) {
        handleResponseError(res, 400, "Code is incorrect")
        return
    }

    const editStudent = await checkCodeStudent.updateOne({ code, firstName, lastName, sex, birthday, placeBirth, classes, phone, email, address })
    handleResponseSuccess(res, 200, "Update account successfully", {...editStudent._doc})
}