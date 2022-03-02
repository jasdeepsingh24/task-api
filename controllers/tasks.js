const Task=require('../models/task');
const getAllTasks = async (req,res)=>{
    try{
        const tasks=await Task.find({});
        res.status(200).json({tasks,count:tasks.length,status:'success'});
    }catch(err)
    {
        res.status(500).json({msg:err});
    }
}
const createTask = async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        return res.status(201).json({task});
    }catch(err)
    {
        res.status(500).json({msg:err});
    }
    
}
const getTask = async (req,res)=>{
    try{
        const task=await Task.findOne({_id:req.params.id});
        if(!task) 
        {
            return res.status(404).json({msg:`Task is not present with id ${req.params.id}`});
        }
        return res.status(200).json({task});
    }catch(err)
    {
        return res.status(500).json({msg:err});
    }
}
// In patch if we only pass one parameter and try to update it, it will work. 
// But in Put we need to specify value of all the parameters.
const updateTask = async (req,res)=>{
    try{
        const {id:taskID}=req.params;
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true});
        if(!task)
        {
            return res.status(404).json({msg:`Sorry, we did not find task '${taskID}' to update`});
        }
        return res.status(200).json({task});
    }catch(err)
    {
        return res.status(500).json({msg:err});
    }
}
const deleteTask = async (req,res)=>{
    try{
        const {id:taskID}=req.params;
        const task= await Task.findOneAndDelete({_id:taskID});
        if(!task)
        {
            return res.status(404).json({msg:`Task is not present with id ${taskID}`});
        }
        res.status(200).json({task});
    }catch(err)
    {
        res.status(500).json({msg:err});
    }
}
module.exports={
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}