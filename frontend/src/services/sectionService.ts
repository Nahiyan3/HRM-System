
import type {
    Section,
    CreateSectionInput,
    UpdateSectionInput
} from "../types/section";

const API_URL = `${import.meta.env.VITE_API_URL}/sections`;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
};

export const getAllSections = async (): Promise<Section[]> => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch sections");
    }

    return response.json();
};

export const createSection = async (
    sectionData: CreateSectionInput
): Promise<void> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(sectionData)
    });

    if (!response.ok) {
        throw new Error("Failed to create section");
    }
};

export const getSectionById = async (id: number): Promise<Section> => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch section");
    }

    const result: { message: string; data: Section } =
        await response.json();

    return result.data;
};

export const updateSection = async (
    id: number,
    sectionData: UpdateSectionInput
): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(sectionData)
    });

    if (!response.ok) {
        throw new Error("Failed to update section");
    }
};

export const deleteSection = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to delete section");
    }
};
