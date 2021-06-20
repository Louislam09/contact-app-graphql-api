const graphql = require('graphql');
const Contact = require('../models/contact')
const Group = require('../models/group')

const { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

const ContactType = new GraphQLObjectType({
    name: "Contact",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {type: GraphQLString },
        lastName: {type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        groups: { 
            type: new GraphQLList(GroupType),
            async resolve({ groups },args){
                const allGroups = Group.find({}) 
                const results = await allGroups.exec();
                const myGroups = results.filter(group => groups.includes(group.id))               
                return myGroups
            }
        },
        isFav: { type: GraphQLBoolean },
    })
})

const GroupType = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        members: { 
            type: new GraphQLList(ContactType),
            async resolve({id},args){
                const allContacts = Contact.find({}) 
                const results = await allContacts.exec();
                const myMembers = results.filter(({groups}) => groups.includes(id))    
                return myMembers
            }
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields:{ 
        contact: {
            type: ContactType,
            args: { id: { type: GraphQLID }},
            resolve(parent,args) {
                return Contact.findById(args.id)
            }
        },
        group: {
            type: GroupType,
            args: { id: { type: GraphQLID }},
            resolve(parent,args) {
                return Group.findById(args.id)
            }
        },
        groups: { 
            type: new GraphQLList(GroupType),
            resolve(parent,args){
                return Group.find({})
            }
        },
        contacts: { 
            type: new GraphQLList(ContactType),
            resolve(parent,args){
                return Contact.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: { 
        addContact: {
            type: ContactType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: {type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                groups: { type: new GraphQLList(GraphQLID)  },
                address: { type: GraphQLString },
            },
            resolve(parent,args){
                let contact = new Contact({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    phone: args.phone,
                    email: args.email,
                    address: args.address,
                    groups: args.groups,
                    isFav: false
                })

                return contact.save();
            }
        },
        createGroup: {
            type: GroupType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                members: { type:  new GraphQLList(GraphQLID) }
            },
            resolve(parent,args){
                let group = new Group({
                    name: args.name,
                    members: args.members
                })

                console.log(group)
                return group.save();
            }
        }        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})