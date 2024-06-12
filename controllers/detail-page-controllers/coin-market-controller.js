import axios from "axios";
import {COINGECKO_COINS_API, COINGECKO_API_KEY} from "../../util/global-variables.js";


const MarketChartController =  (app) => {
    async function getCoinMC(req, res) {
        const coinID = req.query.coinID;
        let days = req.query.days;
        if (days === "null") {
            days = "1";
        }

        await axios.get(`${COINGECKO_COINS_API}${coinID}/market_chart?vs_currency=usd&days=${days}&precision=full&x_cg_demo_api_key=${COINGECKO_API_KEY}`)
            .then((response) => {
                res.json(response.data);
            })
            .catch(() => {
                console.log("Failed to fetch chart data");
                res.status(500).json({error: "Failed to fetch chart data"});
            });
    }

    app.get("/detail/getCoinMarketChart", getCoinMC);
}

export default MarketChartController;