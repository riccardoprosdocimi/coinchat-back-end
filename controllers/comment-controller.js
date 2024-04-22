import * as dao from '../daos/comments-dao.js';

class ReactionTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ReactionTypeError';
    }
}

async function createNewComment(req, res) {
    const newComment = req.body
    await dao.createNewComment(newComment).then(
        (thisRes) => {
            res.json(thisRes)
        }
    )
}

async function findAllComment(req, res) {
    await dao.findAllComment().then(

        (thisRes) => {
            res.json(thisRes)
        }
    )
}

async function findCommentByObjectID(req, res) {
    const objID = req.query.objID;
    const objType = req.query.objType;


    await dao.findCommentByObjectID(objID, objType).then(
        (thisRes) => {
            res.json(thisRes)
        }
    )
}

const findCommentsByAuthorID = async (req, res) =>
    await dao.findCommentsByAuthorID(req.params.uid)
        .then(comments => res.json(comments))

async function findCommentByAuthorID(req, res) {
    const authorID = req.query.authorID;
    await dao.findCommentByAuthorID(authorID).then(
        (thisRes) => {
            res.json(thisRes)
        }
    )
}

async function deleteComment(req, res) {
    const commentID = req.query.commentID;
    await dao.deleteComment(commentID).then(
        async (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        (err) => console.log(err)
    )
}

async function createNewUCRecord(req, res) {
    const newUCRecord = req.body;
    const commentID = req.body.commentID;
    const reaction = req.body.reactionType;
    await dao.createNewUCRecord(newUCRecord).then(
        async () => {
            if (reaction === 1){
                await dao.updateComment(commentID, {$inc: {likes: reaction}})
            } else {
                await dao.updateComment(commentID, {$inc: {dislikes: -reaction}})
            }
            res.sendStatus(200);
        }
    )
}

async function findAllUCRecord(req, res) {
    await dao.findAllUCRecord().then(

        (thisRes) => {
            res.json(thisRes)
        }
    )
}

async function findUCRecordByUserID(req, res) {
    const userID = req.query.userID;
    await dao.findUCRecordByUserID(userID).then(
        (thisRes) => {
            res.json(thisRes)
        }
    )
}

async function deleteUCRecord(req, res) {
    const reaction = req.query.reactionType;
    if (reaction === undefined) {throw new ReactionTypeError("Reactiontype is undefined in deleteUCRecord")}
    const commentID = req.query.commentID;
    await dao.deleteUCRecord(req.query.userID, req.query.commentID).then(
        async () => {
            // it could be a like or dislike
            if (reaction === "1") {
                await dao.updateComment(commentID, {$inc: {likes: -reaction}})
            } else if (reaction === "-1") {
                await dao.updateComment(commentID, {$inc: {dislikes: reaction}})
            } else {
                console.log("deleteUCRecord receive invalid reaction type")
            }
            res.sendStatus(200);
        }
    )
}

async function updateUCRecord(req, res) {
    // the update logic is accepting the original reaction, and update everything based on that
    const originalReaction = req.body;
    const reaction = originalReaction.reactionType;
    if (reaction !== 1 && reaction !== -1) {console.log("Error, reaction value is invalid: " + reaction)}
    await dao.updateUCRecord(originalReaction.userID, originalReaction.commentID, -reaction)
        .then(
            async (thisRes) => {

                await dao.updateComment(originalReaction.commentID, {$inc: {likes: -reaction}})
                await dao.updateComment(originalReaction.commentID, {$inc: {dislikes: reaction}})

                res.json(thisRes);
            }
    )
}

const CommentsController = app => {
    app.post("/api/comment", createNewComment)
    app.get("/api/comment/all", findAllComment)
    app.get("/api/comment/object", findCommentByObjectID)
    app.get("/api/comment/author", findCommentByAuthorID)
    app.get("/api/users/:uid/comments", findCommentsByAuthorID)
    app.delete("/api/comment", deleteComment)
    // app.put("/api/comment", updateComment)

    app.post("/api/comment/react", createNewUCRecord)
    app.get("/api/comment/react/all", findAllUCRecord)  // just for test
    app.get("/api/comment/react/uid", findUCRecordByUserID)
    app.delete("/api/comment/react", deleteUCRecord)
    app.put("/api/comment/react", updateUCRecord)

}

export default CommentsController;