from fastapi import FastAPI

from .routers import items

app = FastAPI(title="CRUD API with FastAPI")

# Register routers
app.include_router(items.router, prefix="/api", tags=["Items"])


@app.get("/")
async def root():
    return {"message": "Welcome: Hexaware API -> Use /api/items"}
