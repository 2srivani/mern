//to preprocess the queries
//query->to retrieve the data(exactly what data to fetch)
//mutation->to update the data
const { Query } = require('mongoose');
const User=require('./model/userSchema');
//define resolvers to execute
const resolvers = {
    Query:{
        getUsers:async(_,{_id})=>{
            return await User.findById(_id);
        }
    },
    Mutation:{
        createUser:async(_,{input})=>{
            try{
                const {name,email,password}=input;
                if(!name || !email || !password){
                    throw new Error("Please enter all the fields");
                }
                const newUser = new User({name,email,password});
                return await newUser.save();


            }catch(err){
                throw Error(err)
            }
        },
        changePass:async(_,{_id,password})=>{
            try{
                    const User=await User.findByIdAndUpdate(id,{password:password},{new:true});
                    if(!userNew){
                        throw new Error('User not found')
                    }
                    return userNew;
            }
            catch(err){
                throw Error(err);
            }
        },

    },
    User:{
        email:(parent)=> parent.email || '',
        name:(parent)=>parent.name || '',
        password:(parent)=>parent.password || '',
    }
};
module.exports=resolvers;