const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Group {
        id: ID!
		name: String
		members: [Contact]
	}

	type Contact {
		id: ID!
		firstName: String
		lastName: String
		phone: String
		email: String
		address: String
		groups: [Group!]!
		isFav: Boolean
	}

    input ContactInput {
        firstName: String!,
        lastName: String!,
        phone: String!,
        email: String,
        groups: [ID],
        address: String,
    }

    input GroupInput {
        name: String!,
        members: [ID]
    }

	type Query {
		contact(id: ID!): Contact
		group(id: ID!): Group
		contacts: [Contact!]!
		groups: [Group!]!
	}

	type Mutation {
        addContact(contactInput: ContactInput!): Contact!
        createGroup(groupInput: GroupInput!): Group!
        toggleContactFav(id: ID!,fav: Boolean!): Contact!
        deleteContact(id: ID!): Contact!
	}
`;

module.exports = {
	typeDefs
};
