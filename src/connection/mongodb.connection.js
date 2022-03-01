const mongoose = require('mongoose');

async function connection(URI) {
  try {
    await mongoose.connect(URI);

    mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  } catch (error) {
    mongoose.connection.on('error', () => console.log(error));
  }
}

connection(process.env.MONGODB_URI);
