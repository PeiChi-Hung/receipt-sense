from io import BytesIO
from fastapi import APIRouter, UploadFile
from PIL import Image
import numpy as np
from app.core.ocr_processor import (
    paddleScan,
    cleanJsonOutput,
    loadModel,
    generateOutputJson,
)

router = APIRouter()


@router.post("/process")
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
