import axios from "axios";
const coinGecko_trending_API = "https://api.coingecko.com/api/v3/search/trending"

let trendingCoins =[
    {"item":{"id":"apollo","coin_id":5226,"name":"Apollo","symbol":"APL","market_cap_rank":860,
            "thumb":"https://assets.coingecko.com/coins/images/5226/thumb/NxxI4VuS.png?1631512642",
            "small":"https://assets.coingecko.com/coins/images/5226/small/NxxI4VuS.png?1631512642",
            "large":"https://assets.coingecko.com/coins/images/5226/large/NxxI4VuS.png?1631512642",
            "slug":"apollo","price_btc":3.9423060147099945e-08,"score":0}
    },

    {"item":{"id":"ankr",
            "coin_id":4324,
            "name":"Ankr",
            "symbol":"ANKR",
            "market_cap_rank":164,
            "thumb":"https://assets.coingecko.com/coins/images/4324/thumb/U85xTl2.png?1608111978",
            "small":"https://assets.coingecko.com/coins/images/4324/small/U85xTl2.png?1608111978",
            "large":"https://assets.coingecko.com/coins/images/4324/large/U85xTl2.png?1608111978",
            "slug":"ankr-network",
            "price_btc":1.2850780532378084e-06,
            "score":1}
    },


]



const HomeController = (app) => {
    const getTrendingCoins = async(req, res) => {
        await axios.get(coinGecko_trending_API)
            .then((response) => {
            res.json(response.data.coins);

        })
            .catch(error=>{
                console.log(error)
            });
    }
    app.get("/api/home/trendingCoins", getTrendingCoins)

}
export default HomeController

