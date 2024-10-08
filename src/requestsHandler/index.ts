import { clusterApiUrl } from "@solana/web3.js";

export const NETWORK = clusterApiUrl('mainnet-beta');

export const RPC = process.env.VITE_REACT_SOLANA_RPC;

export const API_KEY = process.env.VITE_REACT_SHYFT_API;

export const MARKETID = process.env.VITE_REACT_MARKET_ID
