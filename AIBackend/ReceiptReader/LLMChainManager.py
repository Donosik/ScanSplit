from langchain.chains import TransformChain
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain import globals
from langchain_core.runnables import chain
from langchain_core.prompts import ChatPromptTemplate
from create_llm import create_llm, create_vision_llm
import ImageInformation


class LLMChainManager:
    def __init__(self):
        pass

    def _create_image_llm_chain(text_message: dict, image_message: dict) -> str:
        """Invoke model with image and prompt"""
        llm = create_vision_llm()
        msg = HumanMessage(content=[text_message, image_message]) 
        output = llm.invoke(msg)
        return output.content
    
    def _unstructured_output_to_receipt(self, unstructured_text: str) -> ImageInformation:
        """Convert the unstructured text to structured receipt information"""
        llm = create_llm()
        structured_llm = llm.with_structured_output(ImageInformation)
        system = """
        The receipt contains the following information:
        """
        prompt = ChatPromptTemplate.from_messages([("system", system), ("human", "{input}")])
        structured_chain = prompt | structured_llm

        result = structured_chain.invoke(unstructured_text)
        return result


    def invoke_with_image(self, image_base64: dict) -> dict:
        """Invoke the model with the image"""
        text_message = {"content": "Your job is to extract the receipt information from the image. Please provide the receipt information. List out all of the items and their prices. Remember to include all of the information that you can find."}
        image_message = {"content": image_base64}

        result = self._create_image_llm_chain(text_message, image_message)

        structured_result = self._unstructured_output_to_receipt(result)
        return structured_result