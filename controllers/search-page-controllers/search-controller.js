import axios from "axios";
const coinGeckoSearch_API = "https://api.coingecko.com/api/v3/search?query="



const SearchController = (app) => {

    async function searchCoinGecko(req, res) {
        const query = req.query.query;
        await axios.get(`${coinGeckoSearch_API}${query}`)
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