const mongoose = require('mongoose');

const URI =
    'mongodb+srv://test123:test123@cluster0.oxdz0.mongodb.net/freetoinvite?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('mongodb connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
