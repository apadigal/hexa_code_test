from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import items

app = FastAPI(title="CRUD API with FastAPI")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with the frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Register routers
app.include_router(items.router, prefix="/api", tags=["Items"])


@app.get("/")
async def root():
    return {"message": "Welcome: Hexaware API -> Use /api/items"}
