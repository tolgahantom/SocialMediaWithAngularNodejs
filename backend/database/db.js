const mongoose = require("mongoose");

const url =
  "mongodb+srv://mongodbuser78:1@socialmediadb.udxrv.mongodb.net/?retryWrites=true&w=majority&appName=SocialMediaDB";

const connection = () => {
  mongoose
    .connect(url)
    .then(() => console.log("Mongoose connection successful"))
    .catch(() => console.log(err.message));
};

module.exports = connection;
