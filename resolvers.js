const Contact = require('./models/Contact');
const Group = require('./models/Group');


const resolvers = {
    Group: {
        members: async ({ id },_) => {
            const allContacts = Contact.find({}) 
            const results = await allContacts.exec();
            const myMembers = results.filter(({groups}) => groups.includes(id))    
            return myMembers
        }
    },
    Contact: {
        groups: async ({ groups },_) => {
            const allGroups = Group.find({}) 
            const results = await allGroups.exec();
            const myGroups = results.filter(group => groups.includes(group.id))               
            return myGroups
        }
    },
	Query: {
		contacts: () => Contact.find({}),
		groups: () => Group.find({}),
        contact: (_,{id}) => Contact.findById(id),
        group: (_,{id}) => Group.findById(id),
	},
	Mutation: {
        addContact: (_,{contactInput:{firstName,lastName,phone,email,address,groups}}) => {
            let contact = new Contact({
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                address: address,
                groups: groups,
                isFav: false
            })

            return contact.save();
        },
        createGroup: (_, {groupInput: {name,members}} ) => {
            let group = new Group({
                name: name,
                members: members
            })

            return group.save();
        },
        // addContactFav: async(_,{id}) => {
        //     return await Contact.findOneAndUpdate({_id: id},{isFav: true})
        // },
        // removeContactFav: async(_,{id}) => {
        //     return await Contact.findOneAndUpdate({_id: id},{isFav: false})
        // },
        toggleContactFav: async(_,{id,fav}) => {
            return await Contact.findOneAndUpdate({_id: id},{isFav: fav})
        },
        deleteContact: async(_,{id}) => {
            return await Contact.findByIdAndDelete(id)
        }

	}
};

module.exports = {
	resolvers
};
