import pandas as pd
import os
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["weatherDB"]
weather_data_collection = db["weather_data"]
weather_data_collection.create_index([('DateTime', 1)])

def attach_weather_data_descriptors(file_path, date, time, tide, location):

    # Read in weather dataframe from file database
    weather_dataframe = pd.read_csv(file_path, index_col=0)

    # Add tide and location to dataframe
    weather_dataframe["Tide"] = tide
    weather_dataframe["Location"] = location

    # Convert datetimes and user provided datetime to milliseconds
    weather_dataframe["DateTime"] = pd.to_datetime(weather_dataframe["DateTime"]).apply(lambda x: x.timestamp() * 1000)
    datetime = pd.to_datetime(date + " " + time).timestamp() * 1000

    # Subtract datetimes by earliest timestamp to retain duration and add user provided datetime to make timesstamps
    # relative to new timestamp
    weather_dataframe["DateTime"] = weather_dataframe["DateTime"] - min(weather_dataframe["DateTime"]) + datetime

    # Convert milliseconds timestamp back to datetime
    weather_dataframe["DateTime"] = pd.to_datetime(weather_dataframe["DateTime"], unit='ms')

    return weather_dataframe


async def upload_weather_data_db(weather_dataframe):
    weather_data_collection.insert_many(weather_dataframe.to_dict("records"))