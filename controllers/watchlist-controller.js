import * as watchlistDao from '../daos/watchlist-dao.js'

const findUserWatchlist = async (req, res) => {
    const uid = req.params.uid
    const watchlist = await watchlistDao.findUserWatchlist(uid)
    res.json(watchlist)
}

const addToWatchlist = async (req, res) => {
    const newItem = req.body
    const addedItem = await watchlistDao.addToWatchlist(newItem)
    res.json(addedItem)
}

const removeFromWatchlist = async (req, res) => {
    const wid = req.params.wid
    const status = await watchlistDao
        .removeFromWatchlist(wid)
    res.json(status)
}

export default (app) => {
    app.get('/api/users/:uid/watchlist', findUserWatchlist)
    app.post('/api/watchlist', addToWatchlist)
    app.delete('/api/watchlist/:wid', removeFromWatchlist)
}