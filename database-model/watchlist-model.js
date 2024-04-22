import mongoose from "mongoose";
import watchlistSchema from "../schemas/watchlist-schema.js";
const watchlistModel = mongoose
    .model('WatchlistModel', watchlistSchema)
export default watchlistModel