from fastapi import APIRouter, HTTPException

from ..models.database import database
from ..schemas.item import Item

router = APIRouter()


@router.get("/items", summary="Get all items")
async def get_items():
    return {"items": list(database.values())}


@router.get("/items/{item_id}", summary="Get an item by ID")
async def get_item(item_id: int):
    item = database.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.post("/items", summary="Create a new item")
async def create_item(item: Item):
    if item.id in database:
        raise HTTPException(status_code=400, detail="Item ID already exists")
    database[item.id] = item.dict()
    return {"message": "Item created successfully", "item": item}


@router.put("/items/{item_id}", summary="Update an item by ID")
async def update_item(item_id: int, updated_item: Item):
    if item_id not in database:
        raise HTTPException(status_code=404, detail="Item not found")
    database[item_id] = updated_item.dict()
    return {"message": "Item updated successfully", "item": updated_item}


@router.delete("/items/{item_id}", summary="Delete an item by ID")
async def delete_item(item_id: int):
    if item_id not in database:
        raise HTTPException(status_code=404, detail="Item not found")
    del database[item_id]
    return {"message": "Item deleted successfully"}
