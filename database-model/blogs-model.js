import mongoose from "mongoose";
import blogsSchema from "../schemas/blogs-schema.js";
import usersModel from "./users-model.js";
import commentModel from "./comments-model.js";

/*----Define all middleware below-----*/

blogsSchema.pre("save", async function() {
    const existingUser = await usersModel.findById(this.authorID);
    if (existingUser === null) {
        throw new Error('Author is not an existing user.');
    }
})

blogsSchema.post("deleteOne", async function() {
    const blogID = this.getQuery()._id;
    // find all comment depend on the blog ID
    await commentModel.find({objectID: blogID, objectType: "Blog"}).then(
        res => {
            res.map( async cm => {
                await commentModel.deleteOne({_id: cm._id})
            })

        }
    )
})

/*----Define all middleware above-----*/



const blogsModel = mongoose.model(
    'BlogModel',
    blogsSchema
)

export default blogsModel