/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";

import { api } from "@app/api/api";

export const getCountries = (params?: any): Promise<AxiosResponse<any>> => {
  return api.get("/countries", { params });
};

export const getPrediction = (params?: any): Promise<AxiosResponse<any>> => {
  return api.get("/prediction", { params });
};

export const getFeatures = (params?: any): Promise<AxiosResponse<any>> => {
  return api.get("/features", { params });
};
