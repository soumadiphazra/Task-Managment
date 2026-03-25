const { connect } = require('mongoose');

const connectDb = async () => {
	try {
		const mongoURI = "mongodb://127.0.0.1:27017/Task_Managment_Portal";
		console.log(mongoURI);
		if (mongoURI) {
			const conn = await connect(mongoURI, {
				serverSelectionTimeoutMS: 40000
			});
			console.log(`MongoDB Connected: ${conn.connection.port}`);
		}
	} catch (error) {
		throw error;
	}
};

module.exports = connectDb;

