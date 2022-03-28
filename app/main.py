from pyexpat import features
from fastapi import FastAPI
import json
import os
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pickle
from datetime import date
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import statistics

class Features(BaseModel):
    country_id: float
    alt_nucl_en_perc: float
    air_trans_freight: float
    comb_ren_waste_perc: float
    elec_prod_coal_perc: float
    elec_prod_hydro_perc: float
    elec_prod_nat_gas_perc: float
    elec_prod_oil_perc: float
    en_use_pc: float
    fossil_fuel_en_cons_perc: float
    gdp_pc: float
    pop_growth_perc: float
    pop_urban_agg: float
    urban_pop_total: float
    urban_pop_growth: float
    methane_em: float
    no2_em: float


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"Hello FastAPI"}

# Get countries list
@app.get("/api/v1/countries")
def getCountries():
    filepath = "app/resources/countries.json"
    countries_list = open(os.path.abspath(filepath), "r")
    return json.load(countries_list)

# Get countrywise prediction
@app.get("/api/v1/prediction")
async def getPrediction(country_id: int = 153, year: int = 2030):

    # load the model from disk
    model_name = "co2_emission_rf.pkl"
    model_path = os.path.abspath(model_name)
    model = pickle.load(open(model_path, 'rb'))

    # Read the csv
    filepath = "data_preprocessed.csv"
    data = pd.read_csv(os.path.abspath(filepath))

    # Filter data based on selected country
    selected_country_data = data.loc[(data['CountryCode'] == int(country_id))]

    features_filepath = "app/resources/features.json"
    features_stream = open(os.path.abspath(features_filepath), "r")
    features_list = json.load(features_stream)
    features = list(features_list.keys())

    # creating the date object of today's date
    todays_date = date.today()

    years = list(range(int(todays_date.year), int(year)+1))

    prediction_data = []
    # Iterate through years
    for year in years:
        # Declare empty list
        year_data = [country_id]
        features_data = []
        # Iterate through features
        for feature in features:
            # split the dataset with 20% test data 
            X_train,X_test,y_train,y_test = train_test_split(selected_country_data['Year'].values.reshape(-1, 1),selected_country_data[[feature]].values,test_size= 0.2)
            reg = LinearRegression()                  # start the clasifier
            reg.fit(X_train,y_train)                  # fit the model       
            predictions = reg.predict([[year]])
            features_data.append({
                "feature_code": feature,
                "feature_name": features_list[feature],
                "value": predictions[0][0]
            })
            year_data.append(predictions[0][0])
        prediction_data.append({
            "year": year,
            "features": features_data,
            "co2_per_capita": model.predict([year_data])[0]
        })
    return {
        "country_id": country_id,
        "predictions": prediction_data
    }

@app.get("/api/v1/prediction-manual")
async def getManualPrediction(input_features: Features):

    features_dict = dict(input_features)
    input_feature_values = list(features_dict.values())

    # load the model from disk
    model_name = "co2_emission_rf.pkl"
    model_path = os.path.abspath(model_name)
    model = pickle.load(open(model_path, 'rb'))

    # Get prediction from model
    prediction = model.predict([input_feature_values])[0]

    return {
        "co2_per_capita": prediction
    }

@app.get("/api/v1/global-prediction")
async def getGlobalPrediction(year: int = 2030):

    # read the csv
    filepath = "data_preprocessed.csv"
    data = pd.read_csv(os.path.abspath(filepath))

    # load the model from disk
    model_name = "co2_emission_rf.pkl"
    model_path = os.path.abspath(model_name)
    model = pickle.load(open(model_path, 'rb'))

    # load features from json
    features_filepath = "app/resources/features.json"
    features_stream = open(os.path.abspath(features_filepath), "r")
    features_list = json.load(features_stream)
    features = list(features_list.keys())

    # get year range
    # creating the date object of today's date
    todays_date = date.today()

    years = list(range(int(todays_date.year), int(year)+1))

    # get countries
    choosen_countries = []
    countries = getCountries()
    choosen_country_codes = ['CHN','USA', 'IND', 'RUS', 'JPN', 'IRN' 'DEU', 'SAU', 'IDN', 'CAN', 'ZAF' 'BRA', 'AUS', 'GBR', 'FRA', 'NOR', 'SWE', 'BGD', 'ARE','COL', 'PAK', 'VNM', 'POL']

    for country in choosen_country_codes:
        for country_entity in countries:
            if country_entity['code'] == country:
                choosen_countries.append(country_entity)


    # 1: Loop through years
    # 2: Get all countries data for that year
    # 3: Get mean value

    year_data = []
    for year in years:
        country_data = []
        for country in choosen_countries:
            country_id = int(country['id'])

            feature_data = [country_id]

            selected_country_data = data.loc[(data['CountryCode'] == country_id)]

            for feature in features:
                # split the dataset with 20% test data 
                X_train,X_test,y_train,y_test = train_test_split(selected_country_data['Year'].values.reshape(-1, 1),selected_country_data[[feature]].values,test_size= 0.2)
                reg = LinearRegression()                  # start the clasifier
                reg.fit(X_train,y_train)                  # fit the model       
                predictions = reg.predict([[year]])
                feature_data.append(predictions)

            country_prediction = model.predict([feature_data])[0]
            country_data.append(country_prediction)

        year_value = {
            "year": year,
            "co2_per_capita": statistics.mean(country_data)
        }
        year_data.append(year_value)

    return year_data
