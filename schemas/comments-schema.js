import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = Schema({
    // default id is the comment ID
    authorID: {type: Schema.Types.ObjectId, ref: 'UsersModel', required: true},  // Same as objectID in user collection
    objectID: {type: String, required: true},    //  Comment object ID base on object type could be coin ID or post ID
    objectType: {type: String, required: true, enum: ["Coin", "Blog"]},   // Comment object type
    detailContent: {type: String, required: true},    //  Content of this comment
    likes: {type: Number, required: true, default: 0},   //  Like numbers
    dislikes: {type: Number, required: true, default: 0},   // Dislike numbers
    },
    {collection: 'comments',  timestamps: true}
)

export default commentSchema