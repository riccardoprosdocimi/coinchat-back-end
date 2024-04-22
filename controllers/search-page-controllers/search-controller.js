import axios from "axios";
const coinGeckoSearch_API = "https://api.coingecko.com/api/v3/search?query="



const SearchController = (app) => {

    async function searchCoinGecko(req, res) {
        const query = req.query.query;
        await axios.get(`${coinGeckoSearch_API}${query}`)
            .then((response) => {
                res.json(response.data.coins);
            })
            .catch(error => {
                console.log(error);
            });
    }

    app.get("/search/coinSearch", searchCoinGecko);


}

export default SearchController;