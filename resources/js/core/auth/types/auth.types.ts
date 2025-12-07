export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: string;
    permissions?: string[];
}

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
