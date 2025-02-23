import db from "../config/index.js";
const { Admin } = db;
import dotenv from "dotenv";
dotenv.config();
const getAll=async(req,res)=>{
    const getAll=await Admin.findAll();
    if(!getAll||!getAll.length===0){
        return res.status(203).json({massage:`No content`})
    }
    else{
        return res.status(200).json(`send`)
    }
}
const getById=async(req,res)=>{
    console.log(`getById`);
}
const Update=async(req,res)=>{
  console.log(`update`);
}
const Delete=async(req,res)=>{
    console.log(`delete`);
}
export default {getAll,getById,Update, Delete}