import dotenv from "dotenv";


// Allows a .env file to be created to store environment variables
dotenv.config()

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const SECRET = process.env.SECRET;
export const COINGECKO_COINS_API = "https://api.coingecko.com/api/v3/coins/";
export const COINGECKO_SEARCH_API = "https://api.coingecko.com/api/v3/search?query=";
export const COINGECKO_TRENDING_API = "https://api.coingecko.com/api/v3/search/trending";
export const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;