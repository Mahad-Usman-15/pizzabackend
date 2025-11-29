import mongoose from "mongoose";
const connectdB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"products",
        
        })
        console.log("Mongo db connected")
    } catch (error) {
        console.log("Error=>", error)
        process.exit(1);
    }
}


export default connectdB