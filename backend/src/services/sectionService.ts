import pool from "../config/db.js";
import type {
    Section,
    CreateSectionInput,
    UpdateSectionInput
} from "../types/sectionTypes.js";

import {
    CREATE_SECTION_QUERY,
    GET_ALL_SECTIONS_QUERY,
    GET_SECTION_BY_ID_QUERY,
    UPDATE_SECTION_QUERY,
    DELETE_SECTION_QUERY
} from "../queries/sectionQueries.js";

export const createSection = async (
    sectionData: CreateSectionInput
): Promise<Section> => {
    const result = await pool.query<Section>(
        CREATE_SECTION_QUERY,
        [sectionData.name]
    );

    return result.rows[0];
};

export const getAllSections = async (): Promise<Section[]> => {
    const result = await pool.query<Section>(GET_ALL_SECTIONS_QUERY);

    return result.rows;
};

export const getSectionById = async (
    id: number
): Promise<Section | null> => {
    const result = await pool.query<Section>(
        GET_SECTION_BY_ID_QUERY,
        [id]
    );

    return result.rows[0] ?? null;
};

export const updateSection = async (
    id: number,
    sectionData: UpdateSectionInput
): Promise<Section | null> => {
    const result = await pool.query<Section>(
        UPDATE_SECTION_QUERY,
        [sectionData.name ?? null, id]
    );

    return result.rows[0] ?? null;
};

export const deleteSection = async (
    id: number
): Promise<Section | null> => {
    const result = await pool.query<Section>(
        DELETE_SECTION_QUERY,
        [id]
    );

    return result.rows[0] ?? null;
};