
import type { Request, Response, NextFunction } from "express";

export const employeeAccessMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Admins can access any employee profile.
    if (req.user?.role === "ADMIN") {
        next();
        return;
    }

    const employeeId = req.user?.employeeId;
    const requestedEmployeeId = Number(req.params.id);

    if (!employeeId) {
        res.status(403).json({
            message: "No employee profile is associated with this account."
        });
        return;
    }

    if (employeeId !== requestedEmployeeId) {
        res.status(403).json({
            message: "You can only access your own employee profile."
        });
        return;
    }

    next();
};
