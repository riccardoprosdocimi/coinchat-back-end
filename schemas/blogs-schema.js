import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = Schema({
        // default id is the blog ID
        authorID: {type: Schema.Types.ObjectId, ref: 'UsersModel', required: true},  // Same as objectID in user collection
        coinID: {type: String, required: true},  // ID from coingecko
        title: {type: String, required: true, unique: true},
        content: {type: String, required: true}  // content of the blog

    },
    {collection: 'blogs',  timestamps: true}
)

export default blogsSchema