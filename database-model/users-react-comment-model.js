import mongoose from "mongoose";
import usersReactCommentSchema from "../schemas/users-react-comment-schema.js";

const usersReactCommentModel = mongoose.model(
    'UsersReactCommentModel', usersReactCommentSchema
);
export default usersReactCommentModel;