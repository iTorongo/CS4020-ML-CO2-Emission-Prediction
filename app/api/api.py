import os
import json
from pyexpat import model
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pickle
from datetime import date
import statistics
from app.api.model import Features

# Returns features list from local json
def get_features():
    features_filepath = "app/resources/features.json"
    features_stream = open(os.path.abspath(features_filepath), "r")
    features_list = json.load(features_stream)
    return features_list 

# Returns countries list from local json
def get_countries():
    filepath = "app/resources/countries.json"
    countries_list = open(os.path.abspath(filepath), "r")
    return json.load(countries_list)

# Returns CO2 Per Capita prediction for a particular country and for a range of years
# Default value is set to USA, and year range is Current year - 2020
def get_prediction(country_id: int = 153, year: int = 2030):
    # Load ML Model
    model = get_ml_model()
    # Load preprocessed CSV data
    data = get_data_csv()
    # Load features list
    features = get_features()
    features_list = list(features.keys())
    # Get years range
    years = get_year_range(year)

    # Filter data based on selected country
    selected_country_data = data.loc[(data['CountryCode'] == (int(country_id) - 1))]

    prediction_data = []

    # Iterate through years
    for year in years:
        # Declare empty list
        year_data = [country_id-1]
        features_data = []
        # Iterate through features
        for feature in features_list:
            # split the dataset with 20% test data 
            X_train,X_test,y_train,y_test = train_test_split(selected_country_data['Year'].values.reshape(-1, 1),selected_country_data[[feature]].values,test_size= 0.2)
            # Train the feature in a LinearRegression model
            reg = LinearRegression()  
            reg.fit(X_train,y_train)  
            # Get prediction for features
            predictions = reg.predict([[year]])
            features_data.append({
                "feature_code": feature,
                "feature_name": features[feature],
                "value": predictions[0][0]
            })
            year_data.append(predictions[0][0])
        prediction_data.append({
            "year": year,
            "features": features_data,
            "co2_per_capita": model.predict([year_data])[0] # Get predicitions from final ML model
        })
    return {
        "country_id": country_id,
        "predictions": prediction_data
    }

# Returns CO2 Per Capita prediction from manually entered feature values
def get_manual_prediction(input_features: Features):

    # Load features
    features_dict = dict(input_features)
    input_feature_values = list(features_dict.values())

    # Load model
    model = get_ml_model()

    # Get prediction from model
    prediction = model.predict([input_feature_values])[0]

    return {
        "co2_per_capita": prediction
    }

# Returns global CO2 Per Capita preditions by selected countries CO2 Per Capita value
# Default year range is current year to 2030
def get_global_prediction(year: int = 2030):
    # Load dataframe
    data = get_data_csv()
    # Load final ML Model
    model = get_ml_model()
    # Load features
    features = get_features()
    features_list = list(features.keys())

    # Get year range
    years = get_year_range(year)

    # get countries
    choosen_countries = []
    countries = get_countries()
    # Selected countries for global predicition
    choosen_country_codes = ['CHN','USA', 'IND', 'RUS', 'JPN', 'IRN' 'DEU', 'SAU', 'IDN', 'CAN', 'ZAF' 'BRA', 'AUS', 'GBR', 'FRA', 'NOR', 'SWE', 'BGD', 'ARE','COL', 'PAK', 'VNM', 'POL']

    for country in choosen_country_codes:
        for country_entity in countries:
            if country_entity['code'] == country:
                choosen_countries.append(country_entity)

    year_data = []
    for year in years:
        country_data = []
        for country in choosen_countries:
            country_id = int(country['id']) - 1

            feature_data = [country_id]

            selected_country_data = data.loc[(data['CountryCode'] == country_id)]

            for feature in features_list:
                # split the dataset with 20% test data 
                X_train,X_test,y_train,y_test = train_test_split(selected_country_data['Year'].values.reshape(-1, 1),selected_country_data[[feature]].values,test_size= 0.2)
                reg = LinearRegression()               
                reg.fit(X_train,y_train)        
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

# Helper methods

# Returns final ML model
def get_ml_model():
    # load the model from disk
    model_name = "co2_emission_rf.pkl"
    model_path = os.path.abspath(model_name)
    model = pickle.load(open(model_path, 'rb'))
    return model

# Returns dataframe from preprocessed csv file
def get_data_csv():
    # Read the csv
    filepath = "data_preprocessed.csv"
    data = pd.read_csv(os.path.abspath(filepath))
    return data

# Returns year range from current year to user provided year
def get_year_range(year):
    todays_date = date.today()
    years = list(range(int(todays_date.year), int(year)+1))
    return years