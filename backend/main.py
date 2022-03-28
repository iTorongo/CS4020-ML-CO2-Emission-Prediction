from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from backend.api import api
from backend.api.model import Features

# Initialise FastAPI app
app = FastAPI()

origins = ["*"]
# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root directory
@app.get("/")
def root():
    return {"Hello FastAPI"}

# Get features list
@app.get("/api/v1/features")
def getCountries():
    return api.get_features()

# Get countries list
@app.get("/api/v1/countries")
def getCountries():
    return api.get_countries()

# Get countrywise prediction
@app.get("/api/v1/prediction")
async def getPrediction(country_id: int = 153, year: int = 2030):
    return api.get_prediction(country_id, year)

# Get manual prediction from user input
@app.get("/api/v1/prediction-manual")
async def getManualPrediction(input_features: Features):
    return api.get_manual_prediction(input_features)

# Get global prediction based on selected countries co2 per capita
@app.get("/api/v1/global-prediction")
async def getGlobalPrediction(year: int = 2030):
    return api.get_global_prediction(year)