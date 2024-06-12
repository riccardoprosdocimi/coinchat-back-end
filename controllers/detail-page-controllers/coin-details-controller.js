import axios from "axios";
import {COINGECKO_COINS_API, COINGECKO_API_KEY} from "../../util/global-variables.js";


const DetailsController =  (app) => {
    async function getCoinData(req, res) {
        const coinID = req.query.coinID;

        await axios.get(`${COINGECKO_COINS_API}${coinID}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false&x_cg_demo_api_key=${COINGECKO_API_KEY}`)
            .then((response) => {
                res.json(response.data);
            })
            .catch(() => {
                console.log("Failed to fetch about data");
                res.status(500).json({error: "Failed to fetch about data"});
            });
    }
    app.get("/detail/getCoinData", getCoinData);
}

export default DetailsController;