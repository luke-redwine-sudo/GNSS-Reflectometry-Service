import pandas as pd
import os
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["data_storage"]
gnss_data_collection = db["gnss_data"]
gnss_data_collection.create_index([('DateTime', 1)])

def process_raw_gnss_data(file_path):

    with open(file_path, 'r') as file:
        raw_gnss_data = file.read()

    datetime_segmented_gnss_data = [">" + entries for entries in raw_gnss_data.split(">")][1:]

    gnss_dataframe = pd.DataFrame(columns=['DateTime', 'Satellite', 'Signal_Strength'])
    datetime = ""

    for line in datetime_segmented_gnss_data:
        for entry in line.split("\n"):
            if (">" in entry):
                date_split = entry.split()
                datetime = date_split[2] + "-" + date_split[3] + "-" + date_split[1] + " " + date_split[4] + ":" + date_split[5] + ":" + date_split[6]
            elif ("G" in entry):
                gnss_data_split = entry.replace("-", " ").split()
                if (len(gnss_data_split) == 5):
                    gnss_data_entry = {'DateTime': datetime, 'Satellite': gnss_data_split[0], 'Signal_Strength': gnss_data_split[4]}
                    gnss_dataframe.loc[gnss_dataframe.index.size] = gnss_data_entry
                elif (len(gnss_data_split) == 6):
                    gnss_data_entry = {'DateTime': datetime, 'Satellite': gnss_data_split[0], 'Signal_Strength': gnss_data_split[5]}
                    gnss_dataframe.loc[gnss_dataframe.index.size] = gnss_data_entry

    return gnss_dataframe

def attach_gnss_data_descriptors(file_path, source, location):

    # Read in gnss dataframe from file database
    gnss_dataframe = pd.read_csv(file_path, index_col=0)

    # Add source and location to dataframe
    gnss_dataframe["Source"] = source
    gnss_dataframe["Location"] = location

    # Convert datetime to datetime object
    gnss_dataframe["DateTime"] = pd.to_datetime(gnss_dataframe["DateTime"])

    return gnss_dataframe


async def upload_gnss_data_db(gnss_dataframe):
    gnss_data_collection.insert_many(gnss_dataframe.to_dict("records"))