import mongoose from "mongoose";
import commentSchema from "../schemas/comments-schema.js";
import usersModel from "./users-model.js";
import usersReactCommentModel from "./users-react-comment-model.js";

/*----Define all middleware below-----*/

// Check if author is exist before create a new comment
commentSchema.pre("save", async function() {
    const existingUser = await usersModel.findById(this.authorID);
    if (existingUser === null) {
        throw new Error('Author is not an existing user.');
    }
})

// Delete all reactions of this comment
commentSchema.post("deleteOne", async function() {
    const commentID = this.getQuery()._id
    // delete all reaction records pertain to the comment
    await usersReactCommentModel.deleteMany({commentID: commentID})

})

/*----Define all middleware above-----*/



const commentModel = mongoose.model(
    'CommentsModel', commentSchema
);
export default commentModel;