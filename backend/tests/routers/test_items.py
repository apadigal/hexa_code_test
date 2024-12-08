import pytest
from fastapi import FastAPI
from httpx import AsyncClient, ASGITransport

from backend.models.database import database
from backend.routers.items import router

# Create a FastAPI app instance for testing
app = FastAPI()
app.include_router(router, prefix="/api")


@pytest.fixture(autouse=True)
def clean_database():
    database.clear()


@pytest.mark.asyncio
async def test_get_items():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/api/items")
    assert response.status_code == 200
    assert response.json() == {"items": []}


@pytest.mark.asyncio
async def test_create_item():
    item = {"id": 1, "name": "Item1", "description": "A test item"}
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.post("/api/items", json=item)
    assert response.status_code == 200
    assert response.json()["message"] == "Item created successfully"


@pytest.mark.asyncio
async def test_get_item():
    item = {"id": 2, "name": "Item2", "description": "Another test item"}
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        # Create an item first
        await client.post("/api/items", json=item)

        # Retrieve the item
        response = await client.get("/api/items/2")
    assert response.status_code == 200
    assert response.json()["name"] == "Item2"


@pytest.mark.asyncio
async def test_delete_item():
    item = {"id": 3, "name": "Item3", "description": "Yet another test item"}
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        # Create an item first
        await client.post("/api/items", json=item)

        # Delete the item
        response = await client.delete("/api/items/3")
    assert response.status_code == 200
    assert response.json()["message"] == "Item deleted successfully"

    # Verify the item is deleted
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/api/items/3")
        assert response.status_code == 404
        assert response.json()["detail"] == "Item not found"


@pytest.mark.asyncio
async def test_create_duplicate_item():
    item = {"id": 4, "name": "Item4", "description": "Duplicate item"}
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        # Create the item once
        await client.post("/api/items", json=item)

        # Attempt to create the same item again
        response = await client.post("/api/items", json=item)
    assert response.status_code == 400
    assert response.json()["detail"] == "Item ID already exists"


@pytest.mark.asyncio
async def test_get_nonexistent_item():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        # Try to retrieve an item that doesn't exist
        response = await client.get("/api/items/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"
