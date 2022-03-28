/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as homeApi from "../api/home.api";

export const HOME_FEATURE_KEY = "home";

interface SliceState {
  countries: any[];
  predictionResults: any;
  topCountriesPrediction: any;
  features: any;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: SliceState = {
  countries: [],
  predictionResults: [],
  topCountriesPrediction: [],
  features: {
    ALT_NUCL_EN_PERC: "Alternative and nuclear energy (% of total energy use)",
    AIR_TRANS_FREIGHT: "Air transport, freight (million ton-km)",
    COMB_REN_WASTE_PERC: "Combustible renewables and waste (% of total energy)",
    ELEC_PROD_COAL_PERC:
      "Electricity production from coal sources (% of total)",
    ELEC_PROD_HYDRO_PERC:
      "Electricity production from hydroelectric sources (% of total)",
    ELEC_PROD_NAT_GAS_PERC:
      "Electricity production from natural gas sources (% of total)",
    ELEC_PROD_OIL_PERC: "Electricity production from oil sources (% of total)",
    EN_USE_PC: "Energy use (kg of oil equivalent per capita)",
    FOSSIL_FUEL_EN_CONS_PERC: "Fossil fuel energy consumption (% of total)",
    GDP_PC: "GDP per capita (current US$)",
    POP_GROWTH_PERC: "Population growth (annual %)",
    POP_URBAN_AGG:
      "Population in urban agglomerations of more than 1 million (% of total population)",
    URBAN_POP_TOTAL: "Urban population (% of total population)",
    URBAN_POP_GROWTH: "Urban population growth (annual %)",
    METHANE_EM: "Methane emissions (kt of CO2 equivalent)",
    NO2_EM: "Nitrous oxide emissions (thousand metric tons of CO2 equivalent)",
  },

  loading: false,
  error: null,
};

export const getCountries = createAsyncThunk("home/getCountries", async () => {
  const response = await homeApi.getCountries();
  return response.data;
});

export const getPrediction = createAsyncThunk(
  "home/getPrediction",
  // eslint-disable-next-line camelcase
  async (params: { year: string; country_id: string }) => {
    const response = await homeApi.getPrediction(params);
    return response.data;
  }
);

export const getCountryWisePrediction = createAsyncThunk(
  "home/getCountryWisePrediction",
  // eslint-disable-next-line camelcase
  async (params: { year: string; country_id: string }) => {
    const response = await homeApi.getPrediction(params);
    return response.data;
  }
);

const homeSlice = createSlice({
  name: HOME_FEATURE_KEY,
  initialState,
  reducers: {},
  extraReducers: builder => {
    /** GET Countries */
    builder.addCase(getCountries.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.countries = action.payload;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /** GET Prediction */
    builder.addCase(getPrediction.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPrediction.fulfilled, (state, action) => {
      state.loading = false;
      state.predictionResults = action.payload;
    });
    builder.addCase(getPrediction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /** GET Prediction */
    builder.addCase(getCountryWisePrediction.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCountryWisePrediction.fulfilled, (state, action) => {
      state.loading = false;
      const isFound = state.topCountriesPrediction.find(
        (pred: any) => pred.country_id === action.payload.country_id
      );
      if (!isFound) {
        state.topCountriesPrediction.push(action.payload);
      }
    });
    builder.addCase(getCountryWisePrediction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const homeReducer = homeSlice.reducer;
