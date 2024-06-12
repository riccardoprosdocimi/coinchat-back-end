import axios from "axios";
import {COINGECKO_SEARCH_API, COINGECKO_API_KEY} from "../../util/global-variables.js";


const SearchController = (app) => {
    async function searchCoinGecko(req, res) {
        const query = req.query.query;

        await axios.get(`${COINGECKO_SEARCH_API}${query}&x_cg_demo_api_key=${COINGECKO_API_KEY}`)
            .then((response) => {
                res.json(response.data.coins);
            })
            .catch(() => {
                console.log("Failed to fetch search data");
                res.status(500).json({error: "Failed to fetch search data"});
            });
    }
    app.get("/search/coinSearch", searchCoinGecko);
}

export default SearchController;