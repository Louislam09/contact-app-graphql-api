const Contact = require('./models/Contact');
const Group = require('./models/Group');

const cons = [
    {
        "id": "60c52e0ae802d23e8ce82a48",
        "firstName": "aascasc",
        "lastName": "Groux2",
        "phone": "+33619083772",
        "email": "clair2e@groux2.com",
        "address": "France, Bethure",
        "isFav": false,
        "groups": [
            {
                "id": "60c52dc8e802d23e8ce82a47",
                "name": "Friends"
            }
        ]
    },
    {
        "id": "60c52ef3e05ca30e20fb9b32",
        "firstName": "aascasc",
        "lastName": "Magallanes",
        "phone": "+18290000000",
        "email": "pedro@magallanes.com",
        "address": "San Pedro",
        "isFav": true,
        "groups": [
            {
                "id": "60c52dc8e802d23e8ce82a47",
                "name": "Friends"
            },
            {
                "id": "60c52e83e05ca30e20fb9b30",
                "name": "Family"
            }
        ]
    },
    {
        "id": "60c52f75e05ca30e20fb9b33",
        "firstName": "aascasc",
        "lastName": "Figeroa",
        "phone": "+18291111111",
        "email": "lucas@figeroa.com",
        "address": "Santiago",
        "isFav": false,
        "groups": [
            {
                "id": "60c52e83e05ca30e20fb9b30",
                "name": "Family"
            },
            {
                "id": "60c52e92e05ca30e20fb9b31",
                "name": "Coworkers"
            }
        ]
    },
    {
        "id": "60c54aad814169360093f093",
        "firstName": "aascasc",
        "lastName": "Martinez",
        "phone": "+18292867606",
        "email": "luis@martinez.com",
        "address": "Santo Domingo Norte",
        "isFav": true,
        "groups": [
            {
                "id": "60c52e92e05ca30e20fb9b31",
                "name": "Coworkers"
            }
        ]
    },
    {
        "id": "60ce6ca23cce1d2258ae13d3",
        "firstName": "aascasc",
        "lastName": "Groux",
        "phone": "8290000000",
        "email": "fanny@groux.com",
        "address": "France, Bethure",
        "isFav": false,
        "groups": []
    }
]

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
        addContactFav: async(_,{id}) => {
            return await Contact.findOneAndUpdate({_id: id},{isFav: true})
        },
        removeContactFav: async(_,{id}) => {
            return await Contact.findOneAndUpdate({_id: id},{isFav: false})
        }
	}
};

module.exports = {
	resolvers
};
