import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: Number,
    username: String,
    password: String,
});

const todoSchema = new mongoose.Schema({
    userId : Number,
    title:String,
    description:String,
    done:Boolean,
});

export const User = mongoose.model("User",userSchema);
export const Todo = mongoose.model("Todo",todoSchema);