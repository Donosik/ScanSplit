from langchain.chains import TransformChain
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain import globals
from langchain_core.runnables import chain
from langchain_core.prompts import ChatPromptTemplate
from ReceiptReader.ImageInformation import ReceiptImageInformation
from ReceiptReader.create_llm import create_llm, create_vision_llm


class LLMChainManager:
    def __init__(self):
        pass

    def _create_image_llm_chain(self, text_message: dict, image_message: dict = None) -> str:
        """Invoke model with image and prompt"""
        llm = create_vision_llm()
        msg = [text_message] # [HumanMessage(content=[text_message, image_message])]
        output = llm.invoke(msg)
        return output.content
    
    def _unstructured_output_to_receipt(self, unstructured_text: str) -> ReceiptImageInformation:
        """Convert the unstructured text to structured receipt information"""
        llm = create_llm()
        # structured_llm = llm.with_structured_output(ReceiptImageInformation)
        # system = """
        # Format the unstructured ocr of the receipt into a JSON object.
        # """
        # prompt = ChatPromptTemplate.from_messages([("system", system), ("human", "{input}")])
        # structured_chain = prompt | structured_llm

        # result = structured_chain.invoke(unstructured_text)
        prompt = """
        Format the unstructured ocr of the receipt into a JSON object with the following fields:
        - name (str): The name of the store/restaurant where the receipt was issued.
        - date (str): The date when the receipt was issued.
        - location (str): The location of the store/restaurant where the receipt was issued. Address or city name.
        - total (float): The total amount of the receipt.
        - tip (float): The tip amount, if available.
        - tax (float): The tax amount, if available.
        - additional_info (str): Any additional information that you can find on the receipt.
        - items (list[dict]): The list of items in the receipt with prices.

        Items should have the following fields:
        - name (str): The name of the item.
        - price (float): The price of the item.
        - quantity (int): The quantity of the item.
        - total_price (float): The total price of the item.
        - category (str): The category of the item. For food items, this could be 'appetizer', 'main dish', 'dessert', 'drink', etc. Guess the category based on your world knowledge.
        - notes (str): Any additional notes or information about the item.
        """
        structured_chain = ChatPromptTemplate.from_messages([("system", prompt), ("human", "{input}")]) | llm
        result = structured_chain.invoke(unstructured_text)
        return result


    def invoke_with_image(self, image_base64: dict) -> dict:
        """Invoke the model with the image"""
        text_message = HumanMessage(
    content=[
        {"type": "text", "text": """Your job is to extract the information from the receipt image in detail. Please include as many details as possible based on the following categories:
	1.	Store Details: Name of the store/restaurant, location, and contact information if available.
	2.	Receipt Type: Indicate whether this is a restaurant, grocery, pharmacy, or other type of receipt based on the context.
	3.	Date and Time: Include the date and time of the purchase if available.
	4.	Items: List each item with:
	•	Item name (and guessed full name if abbreviated)
	•	Quantity
	•	Unit price
	•	Total price
	•	Category (e.g., drink, main dish, dessert, etc.)
	5.	Financial Summary: Provide subtotal, tax, tip, and total amounts.
	6.	Other Information: Include additional notes or information if available.
         """},
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"},
        },
    ],
)
# "Your job is to extract the receipt information from the image. Please provide the receipt information. List out all of the items and their prices. Remember to include all of the information that you can find."
        # image_message =  image_base64
        
        result = self._create_image_llm_chain(text_message)
        print(result)
        structured_result = self._unstructured_output_to_receipt(result)
        return structured_result
        