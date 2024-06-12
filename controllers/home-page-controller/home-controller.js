import axios from "axios";
import {COINGECKO_TRENDING_API, COINGECKO_API_KEY} from "../../util/global-variables.js";


const HomeController = (app) => {
    const getTrendingCoins = async(req, res) => {
        await axios
            .get(`${COINGECKO_TRENDING_API}?x_cg_demo_api_key=${COINGECKO_API_KEY}`)
            .then((response) => {
                res.json(response.data.coins);
            })
            .catch(() => {
                console.log("Failed to fetch trending data");
                res.status(500).json({error: "Failed to fetch trending data"});
            });
    }
    app.get("/api/home/trendingCoins", getTrendingCoins)
}

export default HomeController