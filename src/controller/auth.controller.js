const {User}=require("../models")



const resgisterUser=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        await User.create({name,email,password})
        res.status(200).json({message:"user resgistered successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const login=async(req,res)=>{
    try {
        const token = req.token; 
        res.status(200).json({ token });
        } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={resgisterUser,login}