const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected : ", conn.connection.host)
    } catch (err) {
        console.error("Connection Error : ", err.message)
    }
}