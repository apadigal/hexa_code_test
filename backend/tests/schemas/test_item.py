import pytest

from backend.schemas.item import Item


def test_valid_item():
    item = Item(id=1, name="TestItem", description="This is a test item.")
    assert item.id == 1
    assert item.name == "TestItem"
    assert item.description == "This is a test item."


def test_invalid_item():
    with pytest.raises(ValueError):
        Item(id="invalid", name="TestItem", description="Invalid ID type")
