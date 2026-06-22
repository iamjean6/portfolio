FROM python:3.11-slim

WORKDIR /app

# Install uv for fast dependency resolution
RUN pip install uv

# Copy dependencies list first for caching
COPY pyproject.toml uv.lock ./

# Install dependencies into the system python environment so uvicorn works out of the box
# Using --system flag to avoid creating a virtualenv inside the container
RUN uv pip install --system -r pyproject.toml

# Copy the rest of the application
COPY . .

# Run the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
