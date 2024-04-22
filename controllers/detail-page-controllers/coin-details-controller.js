import axios from "axios";
const coinGecko_GetCurrentData_API = "https://api.coingecko.com/api/v3/coins/"


const DetailsController =  (app) => {

    async function getCoinData(req, res) {
        const coinID = req.query.coinID;

        // Temporarily set the local to en
        await axios.get(`${coinGecko_GetCurrentData_API}${coinID}?localization=false`)
            .then((response) => {
                res.json(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    app.get("/detail/getCoinData", getCoinData);


}

export default DetailsController;