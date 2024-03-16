
const { GraphQLObjectType  , GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } =  require('graphql')

const Users   = require('../models/usersDB');




// Users Type 

const usertype = new GraphQLObjectType({
    name : 'user', 
    fields: () => ({
        id : { type : GraphQLID}, 
        name : { type : GraphQLString}, 
        gmail : { type : GraphQLID}, 
        phone : { type : GraphQLID}, 
    })
})





const query = new GraphQLObjectType({
    name : 'RootQueryType',
    fields :{
        users: {
            type : new GraphQLList(usertype), 
            resolve(parent , args){
                return Users.find();
            }
        },
        user:{
             type: usertype, 
             args: { id: { type : GraphQLID }},
             resolve(parent , args ){
                return Users.findById(args.id);
             }
        },
    }
})


const mutation = new GraphQLObjectType({
    name:'mutations',
    fields: {
        addUser: {
            type : usertype , 
            args : { 
                name  : { type : new GraphQLNonNull( GraphQLString )}, 
                gmail : { type : new GraphQLNonNull( GraphQLString )} , 
                phone : { type : new GraphQLNonNull( GraphQLString )}, 
            }, 
            resolve(parent, args){
                const user = new Users({
                     name : args.name , 
                     gmail : args.gmail, 
                     phone : args.phone, 
                })
                return user.save();
            }
           
        },
        delUser: {
            type:usertype ,
            args : { id : { type : new GraphQLNonNull(GraphQLID)}}, 
            resolve(parent , args){
                return Users.findByIdAndDelete(args.id);
            }
        }, 
        editUser : {
            type : usertype ,  
            args : {
                  id : { type : new GraphQLNonNull(GraphQLID) },
                  name : { type : GraphQLString}, 
                  gmail : { type : GraphQLString}, 
                  phone : { type : GraphQLString},  
            },
            resolve(parent , args ){
                return Users.findByIdAndUpdate(args.id, {
                        $set : {
                            name: args.name, 
                            gmail : args.gmail, 
                            phone : args.phone
                        }
                }, { new : true}) 
            }
        }, 

    }
})


module.exports = new GraphQLSchema({
      query,
      mutation, 
})



