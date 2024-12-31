from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
from io import BytesIO

from src.utils.ocr_service import generateOutputJson, load_model


app = FastAPI()


@app.post("/chat")
def chat(message: str):
    return JSONResponse(content=message, status_code=200)


@app.post("/upload")
async def create_upload_image(file: UploadFile):
    # Read the image data from the file object
    contents = await file.read()

    # Create a BytesIO object to work with PIL
    input = Image.open(BytesIO(contents))

    # Generate JSON with finetuned donut model
    processor, model = load_model()
    invoice_json = generateOutputJson(processor, model, input)
    return invoice_json
