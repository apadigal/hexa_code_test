import {ItemsAPI} from "./ItemsAPI";
import {Item} from "../../../models/Types";

import {get} from "lodash";
import {AppDispatch, AppThunk} from "../../Store";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE";
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";

export interface ItemsAction {
    type: string;
    payload?: any;
}

export const getItems = (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch({type: GET_ITEMS_REQUEST});
    try {
        const data = await ItemsAPI.getItems();
        dispatch({type: GET_ITEMS_SUCCESS, payload: data.items});
    } catch (error) {
        dispatch({type: GET_ITEMS_FAILURE, payload: get(error, "message")});
    }
};

export const createItem = (item: Item): AppThunk => async (dispatch: AppDispatch) => {
    const newItem = await ItemsAPI.createItem(item);
    dispatch({type: CREATE_ITEM_SUCCESS, payload: newItem});
};

export const updateItem =
    (id: number, updatedItem: Partial<Item>): AppThunk =>
        async (dispatch: AppDispatch) => {
            const updated = await ItemsAPI.updateItem(id, updatedItem);
            dispatch({type: UPDATE_ITEM_SUCCESS, payload: updated});
        };

export const deleteItem = (id: number): AppThunk => async (dispatch: AppDispatch) => {
    await ItemsAPI.deleteItem(id);
    dispatch({type: DELETE_ITEM_SUCCESS, payload: id});
};
