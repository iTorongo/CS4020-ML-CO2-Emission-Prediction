import axios from "axios";

import { ENV } from "@app/constants/env";

/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
