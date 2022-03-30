# CS4020: Carbon Emission Prediction Using Machine Learning
CS4020: Carbon Emission Prediction Using Machine Learning.   
This repository has been made as a part of the final project assignment of USN Data Science course CS4020 by Md. Muzibur Rahman and Arnaf Aziz Torongo.

## Introduction

Global warming is one of the critical reasons for climate change. The emission of Carbon dioxide (CO2) by humans is one of many reasons for global warming. If necessary measures are not taken in time, this will cause a devastating impact throughout the world. This project aims to provide a more comprehensive range of country wise CO2 predictions analyzing the time series dataset and applying several machine learning algorithms and techniques.


## Setup development environment

 1. Download the project and unzip it

 2. Go to the directory named CS4020-ML-CO2-Emission-Prediction <br>
 ```cd CS4020-ML-CO2-Emission-Prediction```
 
 [NB: To run jupyter lab or API server and dashboard are independent tasks. Either can be run independently by following the below steps]

 ### Create virtual environment and run jupyter lab

 1. Create a virtual environment <br>
 ```python -m venv venv``` for window <br>
```python3 -m venv venv```for mac and linux <br>

2. Activate virtual environment <br>
```Scripts\activate```for window <br>
```source venv/bin/activate``` for mac and linux <br>

3. Install requirements <br>
```pip install -r requirements.txt``` for window <br>
```pip3 install -r requirements.txt``` for mac and linux <br>

4. Run Jupyter Lab type <br>
```jupyter lab```


 ### Run API server and dashboard
 
1. It is mandator to have [docker](https://www.docker.com/) installed in the machine.
2. Run `docker-compose build && docker-compose up -d` to start the full development stack. This will eventually run the API server and dashboard on docker container
3. The above command will take some time depending on machine performance. After completing go to `http://localhost:3000` and see the dashboard.
4. To stop docker at the end run `docker-compose down`




