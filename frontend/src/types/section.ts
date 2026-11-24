export interface Section {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateSectionInput {
    name: string;
}

export interface UpdateSectionInput {
    name?: string;
}