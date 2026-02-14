import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    qualificatios:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        default:0
    },
    worksInHospitals:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"hospitalRecord"
        }
    ]
},{timestamps:true})

export const doctorRecord=mongoose.model("DoctorRecord",doctorSchema);