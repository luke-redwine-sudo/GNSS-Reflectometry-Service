import pandas as pd
import os
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["data_storage"]
flight_data_collection = db["flight_data"]
flight_data_collection.create_index([('DateTime', 1)])

def process_raw_flight_data(file_path):

    with open(file_path, 'r') as file:
        raw_flight_data = file.read()

    segmented_flight_data = [entry for entry in raw_flight_data.split("\n") if entry.startswith("ATT") or entry.startswith("GPS")]
    att_flight_dataframe = pd.DataFrame(columns=['DateTime', 'Roll', 'Pitch', 'Yaw'])
    gps_flight_dataframe = pd.DataFrame(columns=['DateTime', 'GMS', 'GWk', 'Lat', 'Lng', 'Alt', 'Spd'])

    for entry in segmented_flight_data:
        if entry.startswith("ATT"):
            att_flight_data_split = entry.split(", ")
            flight_data_entry = {'DateTime': int(att_flight_data_split[1]), 'Roll': att_flight_data_split[3], 'Pitch': att_flight_data_split[5], 'Yaw': att_flight_data_split[7]}
            att_flight_dataframe.loc[att_flight_dataframe.index.size] = flight_data_entry
        elif entry.startswith("GPS"):
            gps_flight_data_split = entry.split(", ")
            flight_data_entry = {'DateTime': int(gps_flight_data_split[1]), 'GMS': int(gps_flight_data_split[3]) * 1000, 'GWk': int(gps_flight_data_split[4]) * 6.048e+11, 'Lat': gps_flight_data_split[7], 'Lng': gps_flight_data_split[8], 'Alt': gps_flight_data_split[9], 'Spd': gps_flight_data_split[10]}
            gps_flight_dataframe.loc[gps_flight_dataframe.index.size] = flight_data_entry

    #att_flight_dataframe["DateTime"] = pd.to_datetime(att_flight_dataframe["DateTime"], unit="us")

    #gps_flight_dataframe["DateTime"] = pd.to_datetime(gps_flight_dataframe["DateTime"], unit="us")

    # Merge dataframes with a tolerance of 200 ms
    flight_dataframe = pd.merge_asof(
        att_flight_dataframe,
        gps_flight_dataframe,
        on="DateTime",
        tolerance=600000000,
        direction="nearest"
    )

    flight_dataframe = flight_dataframe.dropna()
    flight_dataframe["DateTime"] = flight_dataframe["GWk"] + flight_dataframe["GMS"] + flight_dataframe["DateTime"] + 3.159504e+14 - 73380000
    flight_dataframe["DateTime"] = pd.to_datetime(flight_dataframe["DateTime"], unit="us")

    return flight_dataframe

async def upload_flight_data_db(flight_dataframe):
    print(flight_dataframe.columns)
    flight_data_collection.insert_many(flight_dataframe.to_dict("records"))