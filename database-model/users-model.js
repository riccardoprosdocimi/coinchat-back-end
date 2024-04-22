import mongoose from "mongoose";
import usersSchema from "../schemas/users-schema.js";
import blogsModel from "./blogs-model.js";
import commentModel from "./comments-model.js";
import followModel from "./follow-model.js";
import usersReactCommentModel from "./users-react-comment-model.js";
import watchlistModel from "./watchlist-model.js";

// delete all data related to a user
usersSchema.post("deleteOne", async function() {
    const userID = this.getQuery()._id;
    await blogsModel.deleteMany({authorID: userID});
    await commentModel.deleteMany({authorID: userID});
    await followModel.deleteMany({$or: [{followee: userID}, {follower: userID}]});
    await usersReactCommentModel.deleteMany({userID: userID});
    await watchlistModel.deleteMany({uid: userID});
});
const usersModel = mongoose.model(
    'UsersModel', usersSchema
);
export default usersModel;