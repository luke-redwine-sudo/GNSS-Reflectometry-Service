from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
import os
import csv, re

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; adjust as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods; adjust as needed
    allow_headers=["*"],  # Allow all headers; adjust as needed
)

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["fileDB"]
gnss_file_collection = db["gnss_files"]
weather_file_collection = db["weather_files"]
satellite_file_collection = db["satellite_files"]
flight_file_collection = db["flight_files"]
video_file_collection = db["video_files"]

directory_path = "GNSS_Data_Storage"

@app.on_event("startup")
async def startup_event():

    folder_list = ["GNSS/Drone", "GNSS/Ground_Station", "Weather", "Satellite", "Flight", "Video"]

    for folder in folder_list:

        folder_and_directory = directory_path + "/" + folder

        if not os.path.exists(folder_and_directory):
            os.makedirs(folder_and_directory)
            print(f"Directory '{folder_and_directory}' created successfully.")
        else:
            print(f"Directory '{folder_and_directory}' exists.")

@app.get('/')
async def health_check():
    return {"status": "Healthy"}


@app.post("/upload_gnss")
async def upload_gnss(data: UploadFile = Form(...), dataFileName: str = Form(...), source: str = Form(...), location: str = Form(...)):
    try:
        contents = await data.read()
        file_path = directory_path + "/GNSS/" + source + "/" + dataFileName

        with open(file_path, 'w') as file:
            # Write content to the file
            file.write(contents.decode("utf-8"))

        file_id = await gnss_file_collection.insert_one({"file_name": dataFileName, "file_path": file_path})
        return JSONResponse(content={"file_id": str(file_id.inserted_id)}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.post("/upload_weather")
async def upload_weather(data: UploadFile = Form(...), date: str = Form(...), time: str = Form(...), tide: float = Form(...), dataFileName: str = Form(...), location: str = Form(...)):
    try:
        contents = await data.read()
        file_path = directory_path + "/Weather/" + dataFileName

        with open(file_path, 'w') as file:
            # Write content to the file
            file.write("".join(contents.decode("utf-8")))

        file_id = await weather_file_collection.insert_one({"file_name": dataFileName, "file_path": file_path, "date": date, "time": time, "tide": tide, "location": location})
        return JSONResponse(content={"file_id": str(file_id.inserted_id)}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.post("/upload_satellite")
async def upload_satellite(data: UploadFile = Form(...), dataFileName: str = Form(...)):
    try:
        contents = await data.read()
        file_path = directory_path + "/Satellite/" + dataFileName

        with open(file_path, 'w') as file:
            # Write content to the file
            file.write(contents.decode("utf-8"))

        file_id = await satellite_file_collection.insert_one({"file_name": dataFileName, "file_path": file_path})
        return JSONResponse(content={"file_id": str(file_id.inserted_id)}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.post("/upload_flight")
async def upload_flight(data: UploadFile = Form(...), dataFileName: str = Form(...), location: str = Form(...)):
    try:
        contents = await data.read()
        file_path = directory_path + "/Flight/" + dataFileName

        with open(file_path, 'w') as file:
            # Write content to the file
            file.write("".join(contents.decode("utf-8")))

        file_id = await flight_file_collection.insert_one({"file_name": dataFileName, "file_path": file_path, "location":location})
        return JSONResponse(content={"file_id": str(file_id.inserted_id)}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.post("/upload_video")
async def upload_video(video: UploadFile = Form(...), videoFileName: str = Form(...), location: str = Form(...)):
    try:
        contents = await video.read()
        file_path = directory_path + "/Video/" + videoFileName

        with open(file_path, 'wb') as file:
            # Write content to the file
            file.write(contents)

        file_id = await video_file_collection.insert_one({"file_name": videoFileName, "file_path": file_path, "location":location})
        return JSONResponse(content={"file_id": str(file_id.inserted_id)}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))