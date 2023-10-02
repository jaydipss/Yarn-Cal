const mongoose = require("mongoose");

//require models & connect to db
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfully with DB...");
  })
  .catch((err) => {
    console.log(err);
  });
