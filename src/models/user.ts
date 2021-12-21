

export interface Token{
    refresh: string;
    access: string;
}

export interface User{
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    groups: any[],
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
}