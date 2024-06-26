import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import SearchController from "./controllers/search-page-controllers/search-controller.js";
import DetailsController from "./controllers/detail-page-controllers/coin-details-controller.js";
import MarketChartController from "./controllers/detail-page-controllers/coin-market-controller.js";
import WatchlistController from "./controllers/watchlist-controller.js";
import UsersController from "./controllers/users-controller.js";
import HomeController  from "./controllers/home-page-controller/home-controller.js";
import CommentsController from "./controllers/comment-controller.js";
import FollowController from "./controllers/follow-controller.js";
import BlogsController from "./controllers/blogs-controller.js";
import {DB_USERNAME, DB_PASSWORD, SECRET} from "./util/global-variables.js";


// options for mongoDB
mongoose.set('strictQuery', false);
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
// build the connection string
const PROTOCOL = "mongodb+srv";
const HOST = "coinchatcluster.2rpbwui.mongodb.net";
const DB_NAME = "CoinChatDB";
const DB_QUERY = "retryWrites=true&w=majority&appName=CoinChatCluster";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString, options)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));

const app = express();
app.use(cors(
    {
        credentials: true,
        origin: true
}));

const mongoStoreOptions = {
    mongoUrl: connectionString,
};
const sessionStore = MongoStore.create(mongoStoreOptions);

let sess = {
    secret: SECRET,
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.json());

app.get('/',(req, res) =>
    res.send('CoinChat Back-End running...'));

UsersController(app);
SearchController(app);
DetailsController(app);
MarketChartController(app);
WatchlistController(app);
HomeController(app);
CommentsController(app);
FollowController(app);
BlogsController(app);

app.listen(process.env.PORT || 4000);