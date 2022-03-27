import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Read the csv
data = pd.read_csv('data_processed_label_encoded.csv')

# Select country
selected_country = input("Please enter country code:\n")

# Filter data based on selected country
selected_country_data = data.loc[(data['CountryCode'] == int(selected_country))]

# Get year range
from_year = input("Please enter initial year:\n")
to_year = input("Please enter final year:\n")

# Get selected features

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

years = list(range(int(from_year), int(to_year)+1))

# Iterate through years
for year in years:
    # Declare empty list
    year_data = [year]
    # Iterate through features
    for feature in features:
        # split the dataset with 20% test data 
        X_train,X_test,y_train,y_test = train_test_split(selected_country_data['Year'].values.reshape(-1, 1),selected_country_data[[feature]].values,test_size= 0.2)
        reg = LinearRegression()                  # start the clasifier
        reg.fit(X_train,y_train)                  # fit the model       
        predictions = reg.predict([[year]])
        year_data.append(predictions[0][0])
        # print("Year: ", year, "\tFeature: ", feature, "\tValue: ", predictions[0][0])
    # Check the stored data
    print("Year: ", year)
    print("Values: ", year_data)


