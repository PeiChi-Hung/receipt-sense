from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
from io import BytesIO

import numpy as np

from src.utils.ocr_service import (
    cleanJsonOutput,
    generateOutputJson,
    loadModel,
    paddleScan,
)


app = FastAPI()


@app.post("/chat")
def chat(message: str):
    return JSONResponse(content=message, status_code=200)


@app.post("/upload")
async def create_upload_image(file: UploadFile):
    # Read the image data from the file object
    contents = await file.read()

    # Create a BytesIO object to work with PIL
    input = Image.open(BytesIO(contents)).convert("RGB")

    input_nparray = np.array(input)
    receipt_texts = paddleScan(input_nparray)

    # Generate JSON with finetuned donut model
    processor, model = loadModel()
    invoice_json = generateOutputJson(processor, model, input)

    # Clean JSON output
    cleaned_json = cleanJsonOutput(invoice_json, receipt_texts)
    return cleaned_json
