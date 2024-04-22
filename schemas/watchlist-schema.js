import mongoose from 'mongoose'
const watchlistSchema = mongoose.Schema(
    {
        uid: String,
        coinID: String
    }, {collection: 'watchlists'})
export default watchlistSchema