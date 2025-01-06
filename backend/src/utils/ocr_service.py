import torch
from transformers import DonutProcessor, VisionEncoderDecoderModel
from paddleocr import PaddleOCR


def loadModel():
    model_id = "mychen76/invoice-and-receipts_donut_v1"
    processor = DonutProcessor.from_pretrained(model_id)
    model = VisionEncoderDecoderModel.from_pretrained(model_id)
    return processor, model


def generateTextInImage(processor, model, input_image, task_prompt="<s_receipt>"):
    pixel_values = processor(input_image, return_tensors="pt").pixel_values
    print("input pixel_values: ", pixel_values.shape)
    task_prompt = "<s_receipt>"
    decoder_input_ids = processor.tokenizer(
        task_prompt, add_special_tokens=False, return_tensors="pt"
    )["input_ids"]
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    outputs = model.generate(
        pixel_values.to(device),
        decoder_input_ids=decoder_input_ids.to(device),
        max_length=model.decoder.config.max_position_embeddings,
        early_stopping=True,
        pad_token_id=processor.tokenizer.pad_token_id,
        eos_token_id=processor.tokenizer.eos_token_id,
        use_cache=True,
        num_beams=1,
        bad_words_ids=[[processor.tokenizer.unk_token_id]],
        return_dict_in_generate=True,
        output_scores=True,
    )
    return outputs


def generateOutputXML(
    processor, model, input_image, task_start="<s_receipt>", task_end="</s_receipt>"
):
    import re

    outputs = generateTextInImage(processor, model, input_image, task_prompt=task_start)
    sequence = processor.batch_decode(outputs.sequences)[0]
    sequence = sequence.replace(processor.tokenizer.eos_token, "").replace(
        processor.tokenizer.pad_token, ""
    )
    sequence = re.sub(
        r"<.*?>", "", sequence, count=1
    ).strip()  # Remove first task start token
    return sequence


def generateOutputJson(
    processor, model, input_image, task_start="<s_receipt>", task_end="</s_receipt>"
):
    xml = generateOutputXML(
        processor, model, input_image, task_start=task_start, task_end=task_end
    )
    result = processor.token2json(xml)
    return result


def paddleScan(img_path_or_nparray):
    paddleocr = PaddleOCR(lang="en", ocr_version="PP-OCRv4", show_log=False)
    result = paddleocr.ocr(img_path_or_nparray, cls=True)
    result = result[0]
    txts = [line[1][0] for line in result]  # Raw text

    # Convert text list to a dictionary
    paddleDict = buildLookupTable(txts)
    return paddleDict


def buildLookupTable(correct_names):
    """
    Builds a lookup dictionary for quick replacement.

    Parameters:
        correct_names (list): List of correctly formatted item names.

    Returns:
        dict: Dictionary with concatenated names as keys and correct names as values.
    """
    lookup_table = {}
    for name in correct_names:
        # Create a key by removing spaces
        concatenated_key = name.replace(" ", "")
        lookup_table[concatenated_key] = name
    return lookup_table


def cleanJsonOutput(json_output, correct_names):
    items = json_output["line_items"]
    if type(items) != list:  # Only one item
        items["item_name"] = correct_names.get(items["item_name"])
    else:
        for item in items:
            item["item_name"] = correct_names.get(item["item_name"])

    return json_output
