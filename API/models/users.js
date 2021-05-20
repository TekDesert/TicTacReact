const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    gamertag: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    online: {
        type: Boolean
    }
});

module.exports = mongoose.model("users", userSchema, "users"); //export user Schema model refering to "users" collection
