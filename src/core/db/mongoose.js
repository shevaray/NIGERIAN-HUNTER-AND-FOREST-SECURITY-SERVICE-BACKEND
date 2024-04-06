const mongoose = require('mongoose');
const databaseName = "hunter-and-forest-security-service"

const connectionURL =`mongodb+srv://admin:9GIXWD2CkE3Yf5Fi@cluster0.pjxtkvx.mongodb.net/${databaseName}`

mongoose.connect(connectionURL)
    .then(() => {console.log('Connection successful!')})
    .catch((error) => { console.log(error) })