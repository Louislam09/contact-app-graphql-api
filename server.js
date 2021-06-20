const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const schema = require("./schema");

const PORT = process.env.PORT || 4000;


const startServer = async () => {
	const app = express();
	app.use(cors());

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		// schema
	})

	server.applyMiddleware({ app });

	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})

	app.listen({port: PORT}, () => 
		console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
	)
}

startServer();

// mongoose
// 	.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
//         useUnifiedTopology: true
// 	})
// 	.then(() => console.log('DB CONNECTED'))
// 	.catch((err) => console.log(err));

// app.use(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema,
// 		graphiql: true
// 	})
// );

// app.listen(PORT, () => {
// 	console.log(`server running in port ${PORT}`);
// });


