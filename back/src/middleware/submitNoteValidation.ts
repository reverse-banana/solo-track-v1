// src/middleware/submitNoteValidation.ts
import { Request, Response, NextFunction } from 'express';

// Middleware function to validate the submitted note
export const validateSubmitNote = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body; // Get the request body
    console.log("Request Body:", body); // Log the request body for debugging

    // Check if the request body is present and is an object
    if (!body || typeof body !== 'object') {
        console.log("Validation Error: Expected JSON input", body); // Log error for invalid input
        return res.status(400).json({ message: "Expected JSON input" }); // Respond with error message
    }

    // Validate that 'value' exists in the body and is an object
    if (!body.value || typeof body.value !== 'object') {
        console.log("Validation Error: Invalid input data", body); // Log error for invalid 'value'
        return res.status(400).json({ message: "Invalid input data" }); // Respond with error message
    }

    // Validate mandatory properties in 'value' against the DailyEntryStatic model
    const requiredKeys = ['date']; // Only 'date' is mandatory

    for (const key of requiredKeys) {
        if (body.value[key] === undefined) {
            console.log(`Validation Error: Missing required property ${key}`); // Log error for missing property
            return res.status(400).json({ message: `Missing required property: ${key}` }); // Respond with error message
        }
    }

    console.log("Validation successful, proceeding to next middleware."); // Log success
    // If validation passes, proceed to the next middleware/controller
    next();
};
