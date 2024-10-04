import mongoose from "mongoose";

const timeTableSchema = mongoose.Schema({
    classes: {
        type: String,
        require:true
    },
    day: {
        type: String,
        require: true
    },
    hour: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    }
});

const TimeTable = mongoose.model('timeTable', timeTableSchema);
export default TimeTable;