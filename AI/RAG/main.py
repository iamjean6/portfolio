import os
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

import vertexai
from vertexai import agent_engines

# Load environment variables
load_dotenv()

GOOGLE_CLOUD_PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT")
GOOGLE_CLOUD_LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")
AGENT_ENGINE_ID = os.getenv("AGENT_ENGINE_ID")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variable to store the initialized agent engine
agent_engine = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global agent_engine
    if not AGENT_ENGINE_ID:
        logger.error("AGENT_ENGINE_ID environment variable is not set!")
    else:
        try:
            # Initialize Vertex AI
            vertexai.init(project=GOOGLE_CLOUD_PROJECT, location=GOOGLE_CLOUD_LOCATION)
            logger.info(f"Initialized Vertex AI for project {GOOGLE_CLOUD_PROJECT} in {GOOGLE_CLOUD_LOCATION}")
            
            # Connect to the deployed Reasoning Engine
            agent_engine = agent_engines.get(AGENT_ENGINE_ID)
            logger.info(f"Successfully connected to Agent Engine: {AGENT_ENGINE_ID}")
        except Exception as e:
            logger.error(f"Failed to connect to Agent Engine: {e}")
    yield

app = FastAPI(lifespan=lifespan)

# Add CORS middleware to allow your Vite frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"status": "Proxy server is running!"}

@app.post("/chat")
async def chat(request: ChatRequest):
    if not agent_engine:
        raise HTTPException(status_code=500, detail="Agent Engine is not initialized")
    
    try:
        # Call the Agent Engine. 
        # Note: 'query' is the method name your ADK agent exposes.
        response = agent_engine.query(query=request.message)
        
        return {"reply": response}
    except Exception as e:
        logger.error(f"Error querying agent engine: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Run server locally on port 8080 (Cloud Run default)
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
