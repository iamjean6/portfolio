# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import logging
import os

import vertexai
from vertexai import agent_engines
from vertexai.preview.reasoning_engines import AdkApp

from rag.agent import root_agent

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Define the path to the .env file relative to this script
ENV_FILE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", ".env")
)

from dotenv import load_dotenv, set_key, dotenv_values
load_dotenv(ENV_FILE_PATH)

GOOGLE_CLOUD_PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT")
GOOGLE_CLOUD_LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION")
STAGING_BUCKET = os.getenv("STAGING_BUCKET")
RAG_CORPUS = os.getenv("RAG_CORPUS")

vertexai.init(
    project=GOOGLE_CLOUD_PROJECT,
    location=GOOGLE_CLOUD_LOCATION,
    staging_bucket=STAGING_BUCKET,
)


# Function to update the .env file
def update_env_file(agent_engine_id, env_file_path):
    """Updates the .env file with the agent engine ID."""
    try:
        set_key(env_file_path, "AGENT_ENGINE_ID", agent_engine_id)
        print(
            f"Updated AGENT_ENGINE_ID in {env_file_path} to {agent_engine_id}"
        )
    except Exception as e:
        print(f"Error updating .env file: {e}")


logger.info("deploying app...")
env_dict = dotenv_values(ENV_FILE_PATH)
# Provide all loaded .env vars, overwriting GOOGLE_GENAI_USE_VERTEXAI to ensure it is 1
# Filter out placeholder values that start with 'YOUR_'
env_vars = {k: v for k, v in env_dict.items() if v and not v.startswith("YOUR_")}
env_vars["GOOGLE_GENAI_USE_VERTEXAI"] = "1"

app = AdkApp(
    agent=root_agent,
    enable_tracing=True,
    env_vars=env_vars
)

logging.debug("deploying agent to agent engine:")

remote_app = agent_engines.create(
    app,
    requirements=[
        "google-cloud-aiplatform[adk,agent-engines]>=1.108.0",
        "google-adk[eval]==1.30.0",
        "python-dotenv",
        "google-auth",
        "tqdm",
        "requests",
        "llama-index",
        "pydantic-settings",
    ],
    extra_packages=[
        "./rag",
    ],
)

# log remote_app
logging.info(
    f"Deployed agent to Vertex AI Agent Engine successfully, resource name: {remote_app.resource_name}"
)

# Update the .env file with the new Agent Engine ID
update_env_file(remote_app.resource_name, ENV_FILE_PATH)
