from PIL import Image
import io
import base64

class ImageConverter:
    def __init__(self):
       self.id = ''

    def image_to_base64(self, image: Image) -> dict:
        # Convert image to text
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        encoded_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return {"image": encoded_image}