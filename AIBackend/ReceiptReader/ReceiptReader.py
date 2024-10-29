import uuid

import ImageConverter
import LLMChainManager

from PIL import Image

class ReceiptReader:
    def __init__(self, id = uuid.uuid4()):
        self.id = id

    def read_receipt(self, receipt_image: Image) -> dict:
        '''
        This function takes in a receipt image and returns a JSON object with the receipt details.
        '''
        converter = ImageConverter()
        image_base64 = converter.image_to_base64(receipt_image)

        # Pass the image to the model for prediction

        llm_chain_manager = LLMChainManager()
        receipt = llm_chain_manager.invoke_with_image(image_base64)

        return {
            "id": self.id,
            "total": 10.0,
            "items": [
                {"name": "item1", "price": 5.0},
                {"name": "item2", "price": 5.0}
            ]
        }