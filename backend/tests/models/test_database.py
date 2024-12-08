from backend.models.database import database


def test_empty_database():
    assert database == {}


def test_add_to_database():
    database[1] = {"name": "TestItem", "description": "Test description"}
    assert 1 in database
    assert database[1]["name"] == "TestItem"
