import mongoose from "mongoose";
import TimeTable from "../models/timeTableModel.js"
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";

export const getTimeTables = async (req, res) => {
    try {
        const timeTable = await TimeTable.find();
        handleResponseSuccess(res, 200, "Get student successfully", { timeTable })
    } catch (error) {
        handleResponseError(res, 500, "Lỗi máy chủ")
        return
    }
}

export const createTimeTable = async (req, res) => {
    const { day, classes, hour, subject } = req.body;

    if ( !day || !classes || !hour || !subject) {
        handleResponseError(res, 404, "Tất cả trường đều bắt buộc")
        return
    }

    const newTimeTable = await TimeTable.create({ day, classes, hour, subject });
    handleResponseSuccess(res, 201, "Tạo học sinh thành công", { ...newTimeTable._doc})

}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Id không đúng")
        return
    }
    const checkStudentByIdInDb = await TimeTable.findById(id);
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