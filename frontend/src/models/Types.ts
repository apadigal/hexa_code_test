export interface Item {
    id: number;
    name: string;
    description: string;
}

export interface ApiResponse {
    items: Item[];
}
