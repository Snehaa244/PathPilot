const User = require('../models/User');

exports.getProfile = async(req,res)=>{
    try{
   const user = await User.findOne(req.user.id)
   
    }
}