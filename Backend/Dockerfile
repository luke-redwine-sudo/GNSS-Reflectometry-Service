# Use the Python 3.9 image as the base image
FROM python:3.9

# Set the working directory within the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install required Python packages (FastAPI, Uvicorn, and Motor) using pip
RUN pip install -r requirements.txt

# Copy all the backend files to the container
COPY . .

# Command to start the FastAPI server using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

