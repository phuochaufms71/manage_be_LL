import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    subject: {
        type: String,
        require: true
    },
    typeExam: {
        type: String,
        require: true
    },
    score: {
        type: String,
        require: true
    }
})

const Score = mongoose.model('scores', scoreSchema);
export default Score;