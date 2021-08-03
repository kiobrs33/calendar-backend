const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('DB Connected Succesful Online!');
    } catch (error) {
        console.log(error);
        throw new Error('Error in the initialization of DB')
    }
}

module.exports = {
    dbConnection
}