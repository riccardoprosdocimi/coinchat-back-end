import axios from "axios";
const coinGecko_coinMarket_API = "https://api.coingecko.com/api/v3/coins/"


const MarketChartController =  (app) => {
    async function getCoinMC(req, res) {
        const coinID = req.query.coinID;
        let days = req.query.days;
        if (days === "null") {
            days = "1";
        }

        // Temporarily set the local to en
        await axios.get(`${coinGecko_coinMarket_API}${coinID}/market_chart?vs_currency=usd&days=${days}`)
            .then((response) => {
                res.json(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    app.get("/detail/getCoinMarketChart", getCoinMC);
}

export default MarketChartController;