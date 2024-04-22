import mongoose from 'mongoose'

const followSchema = mongoose.Schema({
        followee : {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
        follower : {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
}, {collection: 'follows'})
export default followSchema