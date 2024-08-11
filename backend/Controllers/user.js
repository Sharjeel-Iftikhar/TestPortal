import User from '../Models/User.js';



export const getUser = async (req,res) =>{
    try{  
        const user = await User.find();
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
}

export const updateUser = async (req,res) =>{
    const {id} = req.body;
    const {Firstname,Lastname} = req.body;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(Firstname!== undefined) user.Firstname = Firstname;
        if(Lastname !== undefined) user.Lastname = Lastname;

        const updateUser = await user.save();
        res.status(200).json(updateUser);

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    
    
}