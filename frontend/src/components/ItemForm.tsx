import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createItem, updateItem} from "../app/features/items/ItemsActions";
import {AppDispatch} from "../app/Store";
import "./ItemForm.css";

interface ItemFormProps {
    item?: {
        id: number;
        name: string;
        description: string;
    };
    onClose?: () => void; // Callback to close the form
}

const ItemForm: React.FC<ItemFormProps> = ({item, onClose}) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        id: item?.id || 0,
        name: item?.name || "",
        description: item?.description || "",
    });

    // Update form data when the selected item changes
    useEffect(() => {
        if (item) {
            setFormData({
                id: item.id,
                name: item.name,
                description: item.description,
            });
        }
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing item
            dispatch(updateItem(formData.id, {
                id: formData.id,
                name: formData.name,
                description: formData.description
            }));
        } else {
            // Create new item
            dispatch(createItem({id: Date.now(), name: formData.name, description: formData.description}));
        }

        if (onClose) onClose(); // Close the form if `onClose` is provided
        setFormData({id: 0, name: "", description: ""}); // Reset the form
    };

    return (
        <div className="form-container">
            <h2>{formData.id ? "Edit Item" : "Add Item"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{formData.id ? "Update Item" : "Create Item"}</button>
                {onClose && <button type="button" onClick={onClose} className="cancel-button">Cancel</button>}
            </form>
        </div>
    );
};

export default ItemForm;
