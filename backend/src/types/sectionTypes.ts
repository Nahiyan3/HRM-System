export interface Section {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateSectionInput {
    name: string;
}

export interface UpdateSectionInput {
    name?: string;
}