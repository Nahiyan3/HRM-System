import { Request, Response } from "express";
import {
    createSection,
    getAllSections,
    getSectionById,
    updateSection,
    deleteSection
} from "../services/sectionService.js";

import type {
    CreateSectionInput,
    UpdateSectionInput
} from "../types/sectionTypes.js";

export const createSectionController = async (
    req: Request,
    res: Response
) => {
    try {
        const sectionData: CreateSectionInput = req.body;

        const section = await createSection(sectionData);

        res.status(201).json({
            message: "Section created successfully!",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create section."
        });
    }
};

export const getAllSectionsController = async (
    req: Request,
    res: Response
) => {
    try {
        const sections = await getAllSections();

        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve sections."
        });
    }
};

export const getSectionByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const section = await getSectionById(id);

        if (!section) {
            res.status(404).json({
                message: "Section not found."
            });
            return;
        }

        res.status(200).json({
            message: "Section retrieved successfully!",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve section."
        });
    }
};

export const updateSectionController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const sectionData: UpdateSectionInput = req.body;

        const section = await updateSection(id, sectionData);

        if (!section) {
            res.status(404).json({
                message: "Section not found."
            });
            return;
        }

        res.status(200).json({
            message: "Section updated successfully!",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update section."
        });
    }
};

export const deleteSectionController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const section = await deleteSection(id);

        if (!section) {
            res.status(404).json({
                message: "Section not found."
            });
            return;
        }

        res.status(200).json({
            message: "Section deleted successfully!",
            data: section
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete section."
        });
    }
};