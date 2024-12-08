import axios from "axios";
import {ApiResponse, Item} from "../../../models/Types";
import {get} from "lodash";


// Base API client
const apiClient = axios.create({
    baseURL: "http://localhost:8000/api", // Update this to match your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// API service methods
export const ItemsAPI = {
    // Fetch all items
    async getItems(): Promise<ApiResponse> {
        const response = await apiClient.get<ApiResponse>("/items");
        return get(response, "data")!;
    },

    // Fetch a single item by ID
    async getItem(id: number): Promise<Item> {
        const response = await apiClient.get<Item>(`/items/${id}`);
        return get(response, "data")!;
    },

    // Create a new item
    async createItem(item: Item): Promise<Item> {
        const response = await apiClient.post<Item>("/items", item);
        return get(response, "data")!;
    },

    // Delete an item by ID
    async deleteItem(id: number): Promise<{ message: string }> {
        const response = await apiClient.delete<{ message: string }>(`/items/${id}`);
        return get(response, "data")!;
    },

    // Update an existing item
    async updateItem(id: number, updatedItem: Partial<Item>): Promise<Item> {
        const response = await apiClient.put<Item>(`/items/${id}`, updatedItem);
        return get(response, "data.item")!;
    },
};
