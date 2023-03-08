const mongoose = require("mongoose");

const initDB = () => {
   try {
      let uri = `mongodb://localhost:27017/user?retryWrites=true&w=majority`;
      //console.log("uri=" + uri);
      const options = {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      };

      // Connect MongoDB Atlas using mongoose connect method
      mongoose.set("strictQuery", false);
      mongoose.connect(uri, options);

      mongoose.connection.on("error", (err) => {
         //console.log("err", err);
      });

      mongoose.connection.on("connected", (err, res) => {
         //console.log("MongoDB connected successfully!");
      });
   } catch (error) {
      //console.log(error);
   }
};
module.exports = initDB;
