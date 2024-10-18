// src/controllers/submitNote.ts
import { Request, Response } from 'express';
import { createDailyEntryStatic, DailyEntryStatic } from '../models/dailyEntryStatic.ts';

// Controller function to handle note submission
export const submitNote = (req: Request, res: Response) => {
    try {
        const body = req.body; // Get the request body
        console.log("body", body);
        // Check if 'value' exists and is an object
        if (body.value && typeof body.value === "object") {
            // Create a daily note by merging default values with user input
            const dailyNote: DailyEntryStatic = {
                ...createDailyEntryStatic(),
                ...body.value,
            };

            return res.status(200).json({
                message: "Daily note submitted successfully",
                data: dailyNote,
            });
        } else {
            // Respond with an error if input data is invalid
            return res.status(400).json({ message: "Invalid input data" });
        }
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error processing request:", error);
        return res.status(500).json({
            message: "An error occurred while processing the request",
        });
    }
};
