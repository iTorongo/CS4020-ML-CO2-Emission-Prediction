# CS4020: Carbon Emission Prediction Using Machine Learning
CS4020: Carbon Emission Prediction Using Machine Learning.   
This repository has been made as a part of the final project assignment of USN Data Science course CS4020 by Md. Muzibur Rahman and Arnaf Aziz Torongo.

## Introduction

Global warming is one of the critical reasons for climate change. The emission of Carbon dioxide (CO2) by humans is one of many reasons for global warming. If necessary measures are not taken in time, this will cause a devastating impact throughout the world. This project aims to provide a more comprehensive range of country wise CO2 predictions analyzing the time series dataset and applying several machine learning algorithms and techniques.

## Installation
 1 - Clone this repository in your current working directory <br>
 ```git clone https://github.com/iTorongo/CS4020-ML-CO2-Emission-Prediction```

 2 - Go to the directory named CS4020-ML-CO2-Emission-Prediction <br>
 ```cd CS4020-ML-CO2-Emission-Prediction```

 3 - Create a virtual environment <br>
 ```python -m venv venv``` for window users <br>
```python3 -m venv venv```for mac and linux users <br>

4 - Activate your virtual environment <br>
```Scripts\activate```for window users 
```source venv/bin/activate``` for mac/linux users <br>

5 - Install requirements <br>
```pip install -r requirements.txt``` for window users
```pip3 install -r requirements.txt``` for mac/linux users <br>

To run API type after installing all the dependencies<br>
```uvicorn app.main:app --reload```

