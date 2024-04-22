import * as dao from '../daos/blogs-dao.js'


async function createNewBlog(req, res) {
    const newBlog = req.body;
    await dao.createNewBlog(newBlog).then(
        (thisRes) => {res.json(thisRes)}
    ).catch(
        err => console.log(err)
    )
}

async function findAllBlogs(req, res) {
    await dao.findAllBlogs().then(
        (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        err => console.log(err)
    )
}

async function updateABlog(req, res) {
    const targetBlogID = req.query.blogID;
    const targetBlog = req.body;
    await dao.updateABlog(targetBlogID, targetBlog).then(
        (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        err => console.log(err)
    )
}

async function findBlogByAuthorID(req, res) {
    const authorID = req.query.authorID
    await dao.findBlogByAuthorID(authorID).then(
        (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        err => console.log(err)
    )
}

async function deleteABlog(req, res) {
    const deleteBlogID = req.query.blogID;
    await dao.deleteABlog(deleteBlogID).then(
        (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        err => console.log(err)
    )
}

async function findBlogByCoinID(req, res) {
    const coinID = req.query.coinID;
    await dao.findBlogByCoinID(coinID).then(
        (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        err => console.log(err)
    )
}

async function findBlogByBlogID(req, res) {
    const blogID = req.query.blogID;
    await dao.findBlogByBlogID(blogID).then(
        (thisRes) => {
            res.json(thisRes)
        }
    ).catch(
        err => console.log(err)
    )
}

const BlogsController = app => {
    app.post("/api/blog", createNewBlog);
    app.get("/api/blog/all", findAllBlogs);
    app.get("/api/blog/one", findBlogByBlogID)
    app.get("/api/blog/author", findBlogByAuthorID);
    app.get("/api/blog/coin", findBlogByCoinID)
    app.put("/api/blog", updateABlog);
    app.delete("/api/blog", deleteABlog);
}

export default BlogsController;