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
from langchain_openai import OpenAI
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

import os

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

def create_vision_llm(model_name="gpt-4o", temperature=0.1, safety_settings=None):
    vision_llm = OpenAI(model_name=model_name)
    return vision_llm

def create_llm(model_name="gpt-4o-mini", max_output_tokens=16128, temperature=0.1):
   
    llm=OpenAI( 
           model_name=model_name,
           temperature=temperature,
    )
    return llm
