from typing import Union

from fastapi import FastAPI, File, UploadFile
from PIL import Image
from fastapi.responses import JSONResponse

from ReceiptReader.ReceiptReader import ReceiptReader
import io
import os
from dotenv import load_dotenv, find_dotenv
import base64
import json
import logging
import re

load_dotenv(find_dotenv())

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

app = FastAPI()

receipt_reader = ReceiptReader()  # Initialize the ReceiptReader object
# Now you should be able to access the API key with os.getenv
api_key = os.getenv("OPENAI_API_KEY")
# print(api_key)  # This should print your API key if loaded correctly

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# @app.post("/upload-photo")
# async def upload_photo(file: UploadFile = File(...)):
#     # Read the uploaded file
#     contents = await file.read()

#     # Open the image for processing
#     image = Image.open(io.BytesIO(contents))

#     image_data = base64.b64encode(contents).decode("utf-8")

#     # Pass the image to the model for prediction
    
#     receipt = receipt_reader.read_receipt(image_data)    

#     # Extract the content from the AIMessage object
#     receipt_content = receipt.content.replace("json\n", "", 1).strip()
#     receipt_content = re.search(r'\{.*\}', receipt_content, re.DOTALL).group(0)
#     print(receipt_content)
#     # Log the receipt content for debugging
#     logging.info(f"Receipt content: {receipt_content}")

#     # Check if receipt_content is not empty
#     if not receipt_content:
#         return JSONResponse(content={"error": "Empty receipt content"}, status_code=400)

#     try:
#         # Parse the receipt string into a JSON object
#         receipt_json = json.loads(receipt_content)
#     except json.JSONDecodeError as e:
#         logging.error(f"JSON decode error: {e}")
#         return JSONResponse(content={"error": "Invalid JSON content"}, status_code=400)

#     # Return the JSON response
#     return JSONResponse(content=receipt_json)



@app.post("/upload-photo")
async def upload_photo(file: UploadFile = File(...)):
    # Static JSON response
    static_response = {
        "name": "Stop & Shop",
        "date": "April 7, 2020",
        "location": "341 Plymouth Street, Halifax, MA 02338",
        "total": 35.01,
        "tip": 0,
        "tax": 0,
        "additional_info": "Store Number: #82, Balance: $35.01",
        "items": [
            {
                "name": "JSPH Org Hummus",
                "price": 5.99,
                "quantity": 1,
                "total_price": 5.99,
                "category": "Cheese Shop",
                "notes": ""
            },
            {
                "name": "SB SW Blend 10Z",
                "price": 2.49,
                "quantity": 1,
                "total_price": 2.49,
                "category": "Frozen Food",
                "notes": ""
            },
            {
                "name": "Amys LS Chnky To",
                "price": 3.99,
                "quantity": 2,
                "total_price": 7.98,
                "category": "Grocery",
                "notes": ""
            },
            {
                "name": "Amys Soup LS Len",
                "price": 3.19,
                "quantity": 1,
                "total_price": 3.19,
                "category": "Grocery",
                "notes": ""
            },
            {
                "name": "Soup Lentil",
                "price": 3.19,
                "quantity": 2,
                "total_price": 6.38,
                "category": "Grocery",
                "notes": ""
            },
            {
                "name": "Dole Spinach 10",
                "price": 4.99,
                "quantity": 1,
                "total_price": 4.99,
                "category": "Produce",
                "notes": ""
            }
        ]
    }

    return JSONResponse(content=static_response)