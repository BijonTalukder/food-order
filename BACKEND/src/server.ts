import mongoose from "mongoose";
import app from "./app";
import config from "./config";
// const port = 3000
async function boostrap() {
    try{
        await mongoose.connect(config.database_url as string);

        app.listen(config.port, () => {
            console.log(`Application app listening on port ${config.port}`)
          })

    }
    catch(e){
        console.log("Failed to connect database")
    }

  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  boostrap()