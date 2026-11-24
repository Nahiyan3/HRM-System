import { body } from "express-validator";

export const createEmployeeValidation = [
    body("employee_code")
        .trim()
        .notEmpty()
        .withMessage("Employee code is required"),

    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("date_joined")
        .notEmpty()
        .withMessage("Joining date is required")
        .isISO8601({ strict: true })
        .withMessage("Invalid joining date"),


    body("date_of_birth")
        .optional({ values: "null" })
        .isISO8601({ strict: true })
        .withMessage("Invalid date of birth"),

    body("gender")
        .optional({ values: "null" })
        .isIn(["Male", "Female", "Other"])
        .withMessage("Gender must be Male, Female, or Other"),

    body("phone")
        .optional({ values: "null" })
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),

    body("section_id")
        .optional({ values: "null" })
        .isInt({ min: 1 })
        .withMessage("Section ID must be a positive integer")
];