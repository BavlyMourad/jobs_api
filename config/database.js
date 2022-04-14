// 5th File

const mongoose = require("mongoose")

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      // useNewUrlParser : The underlying MongoDB driver has deprecated their current connection string parser.
      // Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
      useNewUrlParser: true,
      // The useUnifiedTopology option removes support for several connection options that are no longer relevant with the new topology engine: autoReconnect
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB Database connected to host: ${con.connection.host}`)
    })
}

module.exports = connectDatabase
