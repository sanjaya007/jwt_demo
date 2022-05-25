const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/jwt_demo";

 mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Database connection successfull !!"))
.catch((err) => console.log(err))
    
