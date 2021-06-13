const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 3000;
const schema = require('./schema');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
        useUnifiedTopology: true
	})
	.then(() => console.log('DB CONNECTED'))
	.catch((err) => console.log(err));

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(PORT, () => {
	console.log(`server running in port ${PORT}`);
});
