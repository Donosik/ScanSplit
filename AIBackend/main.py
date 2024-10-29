
from typing import Union

from fastapi import FastAPI, File, UploadFile
from PIL import Image

import ReceiptReader
import io

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/upload-photo")
async def upload_photo(file: UploadFile = File(...)):
    # Read the uploaded file
    contents = await file.read()

    # Open the image for processing
    image = Image.open(io.BytesIO(contents))

    # Example processing (reformatting or resizing)
    image = image.convert("RGB")  # Convert to RGB format
    image = image.resize((128, 128))  # Resize to 128x128 for example

        # Pass the image to the model for prediction
    
        # Return the json from the recipt

    
        


    # Return an empty JSON response
    return {}