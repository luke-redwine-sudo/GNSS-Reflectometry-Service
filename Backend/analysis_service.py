import pandas as pd
import json
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
data_db = client["data_storage"]
file_db = client["fileDB"]
flight_data_collection = data_db["flight_data"]
gnss_data_collection = data_db["gnss_data"]
weather_data_collection = data_db["weather_data"]
video_file_collection = file_db["video_files"]

async def find_videos(start_date, start_time, end_date, end_time, location):
    try:
        # Convert start and end dates/times to datetime objects
        start_datetime = datetime.strptime(f"{start_date} {start_time}", "%Y-%m-%d %H:%M:%S")
        end_datetime = datetime.strptime(f"{end_date} {end_time}", "%Y-%m-%d %H:%M:%S")

        # Define the filter criteria based on the inputs
        filter_criteria = {"location": location}

        videos = []
        async for video in video_file_collection.find(filter_criteria):
            videos.append(video)

        return videos
    except Exception as e:
        print(e)
        raise