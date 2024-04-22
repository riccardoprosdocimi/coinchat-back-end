import commentModel from "../database-model/comments-model.js";
import usersReactCommentModel from "../database-model/users-react-comment-model.js"

export const createNewComment = async newComment => await commentModel.create(newComment);

export const findAllComment = async () => await commentModel.find({});

export const findCommentByObjectID = async (objId, objType) =>
    await commentModel.find({objectID: objId, objectType: objType}).
    populate("authorID");

export const findCommentByAuthorID = async uid => await commentModel.find({authorID: uid});

export const findCommentsByAuthorID = async uid => await commentModel.find({authorID: uid});

export const deleteComment = async commentID => await commentModel.deleteOne({_id: commentID});

export const updateComment = async (commentID, commentUpdates) => await commentModel
    .updateOne({_id: commentID}, commentUpdates);

export const createNewUCRecord = async newUCRecord => await usersReactCommentModel.create(newUCRecord);

export const findAllUCRecord = async () => await usersReactCommentModel.find({});

export const findUCRecordByUserID = async (uid) => await usersReactCommentModel.find({userID:uid})

export const updateUCRecord = async (userID, commentID, reaction) => await usersReactCommentModel
    .updateOne({userID, commentID}, {$set: {reactionType: reaction}})

export const deleteUCRecord = async (uid, commentID) => await usersReactCommentModel
    .deleteOne({userID:uid, commentID:commentID})
