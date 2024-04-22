import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    banner: {type: String, required: true, unique: false},
    avatar: {type: String, required: true, unique: false},
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    bio: {type: String, required: false, unique: false},
    city: {type: String, required: false, unique: false},
    address: {type: String, required: false, unique: false},
    website: {type: String, required: false, unique: true},
    birthday: {type: Date, required: true, unique: false},
    email: {type: String, required: true, unique: true},
    handle: {type: String, required: true, unique: true},
    countryCode: {type: Number, required: false, unique: false},
    number: {type: Number, required: false, unique: true},
    password: {type: String, required: true, unique: false},
    role: {type: String, required: true, unique: false,
        enum: ['PERSONAL', 'PROFESSIONAL', 'ADMIN']}
}, {collection: 'users'});
export default usersSchema;