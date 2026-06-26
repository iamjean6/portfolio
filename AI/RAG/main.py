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
        events_list = list(agent_engine.stream_query(message=request.message, user_id="frontend-user"))
        
        reply_text = ""
        for event in events_list:
            # ADK events wrap the final response text in `content` or `actions` depending on version
            # First try extracting from the standard GenAI Content format:
            if "content" in event and "parts" in event["content"]:
                for part in event["content"]["parts"]:
                    if "text" in part:
                        reply_text += part["text"]
            
            # Fallback to the newer actions format
            elif "actions" in event and event["actions"]:
                actions = event["actions"]
                if "agent_message" in actions:
                    reply_text += actions["agent_message"].get("text", "")
                elif "agent_response" in actions:
                    reply_text += actions["agent_response"].get("text", "")
                elif "text" in actions:
                    reply_text += actions["text"]
            elif "message" in event and "content" in event["message"]:
                 pass # usually echo of user message
                 
        if not reply_text:
            # Fallback if the ADK structure is different
            reply_text = str(events_list)

        return {"reply": reply_text.strip()}
    except Exception as e:
        logger.error(f"Error querying agent engine: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Run server locally on port 8080 (Cloud Run default)
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
