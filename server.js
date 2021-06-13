const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 4000;
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// allow cross-domain requests
app.use(cors());

// mongoose connection
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
