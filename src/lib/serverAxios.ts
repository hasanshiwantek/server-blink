// lib/serverAxios.ts
import axios from "axios";

const serverAxios = axios.create({
  baseURL: "https://ecom.brokercell.com/api/",
  headers: {
    storeId: 4, // Replace with dynamic storeId if needed
  },
});

export default serverAxios;
