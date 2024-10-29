import glob
import pprint

from typing import Any, Iterator, List
from langchain_community.vectorstores import Chroma
from langchain.agents import AgentType, initialize_agent
from langchain.document_loaders import TextLoader
from langchain.embeddings import VertexAIEmbeddings
from langchain.llms import VertexAI
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain import LLMChain
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)





def create_vision_llm(model_name="gemini-1.5-pro-001", temperature=0.1, safety_settings=None):
    vision_llm = ChatVertexAI(model_name=model_name, temperature=temperature, safety_settings=safety_settings)
    return vision_llm

def create_llm(model_name="gemini-pro", max_output_tokens=16128, temperature=0.1):
   
    llm=VertexAI( 
           model_name=model_name,
           max_output_tokens=max_output_tokens,
           temperature=temperature,
           safety_settings=safety_settings
       )
    return _create_local_llm() #llm
