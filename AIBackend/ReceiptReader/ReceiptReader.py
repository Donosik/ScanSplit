import uuid


from PIL import Image

from ReceiptReader.ImageConverter import ImageConverter
from ReceiptReader.LLMChainManager import LLMChainManager

class ReceiptReader:
    def __init__(self, id = uuid.uuid4()):
        self.id = id

    def read_receipt(self, receipt_image: Image) -> dict:
        '''
        This function takes in a receipt image and returns a JSON object with the receipt details.
        '''
        converter = ImageConverter()
        image_base64 = receipt_image #converter.image_to_base64(receipt_image)

        # Pass the image to the model for prediction

        llm_chain_manager = LLMChainManager()
        receipt = llm_chain_manager.invoke_with_image(image_base64)

        ret_dict = {
                "error": "No receipt information found."
        }
        if receipt:
            ret_dict = receipt

        return ret_dict