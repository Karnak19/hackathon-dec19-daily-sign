import dotenv from "dotenv";
dotenv.config();

export const API_URL = process.env.API_URL || "http://192.168.172.131:8000";
