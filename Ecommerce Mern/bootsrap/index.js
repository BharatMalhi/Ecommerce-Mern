const mongoose = require("mongoose");
const config = require("../config/config");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(config.MONGODB_URL);
    // .then(() => console.log('database connected'))
    // .catch((err) => console.log(`database not Connected ${err}`))
    console.log(
      `Connected Successfully To Database `
      // connect.connection.host,
      // connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
