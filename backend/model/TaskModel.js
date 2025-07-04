import mongoose, { Types } from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        require:true,
        trim: true,
    },
    description:{
        type: String,
        require: true,
        trim: true,

    },
    complete:{
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("Task", taskSchema);