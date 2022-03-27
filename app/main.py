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

    features = [ 
        'ALT_NUCL_EN_PERC',
        'AIR_TRANS_FREIGHT',
        'COMB_REN_WASTE_PERC',
        'ELEC_PROD_COAL_PERC',
        'ELEC_PROD_HYDRO_PERC',
        'ELEC_PROD_NAT_GAS_PERC',
        'ELEC_PROD_OIL_PERC',
        'EN_USE_PC',
        'FOSSIL_FUEL_EN_CONS_PERC',
        'GDP_PC',
        'POP_GROWTH_PERC',
        'POP_URBAN_AGG',
        'URBAN_POP_TOTAL',
        'URBAN_POP_GROWTH',
        'METHANE_EM',
        'NO2_EM'
    ]

    # creating the date object of today's date
    todays_date = date.today()

    years = list(range(int(todays_date.year), int(year)+1))

    prediction_data = []
    # Iterate through years
    for year in years:
        # Declare empty list
        year_data = [country_id]
        # Iterate through features
        for feature in features:
            # split the dataset with 20% test data 
            X_train,X_test,y_train,y_test = train_test_split(selected_country_data['Year'].values.reshape(-1, 1),selected_country_data[[feature]].values,test_size= 0.2)
            reg = LinearRegression()                  # start the clasifier
            reg.fit(X_train,y_train)                  # fit the model       
            predictions = reg.predict([[year]])
            year_data.append(predictions[0][0])
        prediction_data.append({
            "year": year,
            "co2_per_capita": model.predict([year_data])[0]
        })
    return {
        "country_id": country_id,
        "predections": prediction_data
    }