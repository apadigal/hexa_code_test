import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteItem, getItems} from "../app/features/items/ItemsActions";
import {AppDispatch, RootState} from "../app/Store";
import ItemForm from "./ItemForm";
import "./ItemsList.css";

const ItemsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading, error} = useSelector((state: RootState) => state.items);

    const [editingItem, setEditingItem] = useState<null | { id: number; name: string; description: string }>(null);

    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        dispatch(deleteItem(id));
    };

    const handleEdit = (item: { id: number; name: string; description: string }) => {
        setEditingItem(item); // Open the form with the selected item's data
    };

    const closeForm = () => {
        setEditingItem(null); // Close the form
    };

    return (
        <div className="container">
            <h1>Items</h1>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul className="items-list">
                {items.map((item) => (
                    <li key={item.id} className="item">
                        <div className="item-content">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Render the ItemForm for editing */}
            {editingItem && <ItemForm item={editingItem} onClose={closeForm}/>}
        </div>
    );
};

export default ItemsList;
