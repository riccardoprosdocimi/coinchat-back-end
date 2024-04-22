import blogsModel from "../database-model/blogs-model.js";


export const createNewBlog = async newBlog => await blogsModel.create(newBlog);

export const findAllBlogs = async () => await blogsModel.find({})
    .populate("authorID");

export const findBlogByAuthorID = async (authorID) => await blogsModel.find({authorID}).populate("authorID");

export const findBlogByCoinID = async (coinID) => await blogsModel.find({coinID}).populate("authorID");

export const findBlogByBlogID = async (blogID) => await blogsModel.findById(blogID).populate("authorID");

export const deleteABlog = async (blogID) => await blogsModel.deleteOne({_id:blogID});

export const updateABlog = async (targetBlogID, targetBlog) => await blogsModel
    .updateOne({_id:targetBlogID}, {$set: targetBlog});
