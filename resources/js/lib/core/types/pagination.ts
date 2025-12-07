export interface Pagination {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_next_page: boolean;
    has_previous_page: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: Pagination;
    extra?: Record<string, any>;
}
