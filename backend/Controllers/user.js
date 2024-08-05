import User from '../Models/User.js';

export const updateUser = async (req,res) =>{
    const {id} = req.params;
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