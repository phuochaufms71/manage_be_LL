import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    classes: {
        type: String,
        require: true
    },
    birthday: {
        type: String,
        require: true
    },
    placeBirth: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    block: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    schoolYear: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        require: true
    }
});

const Student = mongoose.model('students', studentSchema);
export default Student;