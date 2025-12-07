export interface Example {
    id: number;
    name: string;
    description?: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

export interface ExampleFormData {
    name: string;
    description?: string;
    status: 'active' | 'inactive';
}

export interface ExampleFilters {
    search?: string;
    status?: string;
}
