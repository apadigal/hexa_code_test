import {
    CREATE_ITEM_SUCCESS,
    DELETE_ITEM_SUCCESS,
    GET_ITEMS_FAILURE,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    ItemsAction,
    UPDATE_ITEM_SUCCESS,
} from "./ItemsActions";
import {Item} from "../../../models/Types";

interface ItemsState {
    items: Item[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
};

export const ItemsReducer = (state = initialState, action: ItemsAction): ItemsState => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ITEMS_SUCCESS:
            return {...state, loading: false, items: action.payload};
        case GET_ITEMS_FAILURE:
            return {...state, loading: false, error: action.payload};
        case CREATE_ITEM_SUCCESS:
            return {...state, items: [...state.items, action.payload.item]};
        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
};
