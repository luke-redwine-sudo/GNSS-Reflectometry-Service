from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
import os

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
collection = db["files"]


@app.post("/upload")
async def upload_file(data: UploadFile = Form(...), dataFileName: str = Form(...), source: str = Form(...), location: str = Form(...)):
    try:
        print(data)
        print(source)
        print(location)
        print(dataFileName)
        contents = await data.read()
        print(contents)
        file_id = await collection.insert_one({"file_contents": dataFileName})
        return JSONResponse(content={"file_id": str(file_id.inserted_id)}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
