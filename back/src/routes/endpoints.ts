// src/routes/endpoints.ts
import { Router } from "express"; // Import Router from express
import { Request, Response } from "express";
import { submitNote } from "../controllers/submitNote.ts";
import { validateSubmitNote } from "../middleware/submitNoteValidation.ts";

const router = Router(); // Create a new router instance

// Define your routes
router.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

// You can add more routes here
// router.post("/api/submitNote", (req: Request, res: Response) => {
//   // Handle the POST request for submitting notes
//   res.send("Note submitted successfully!");
// });

router.post("/api/submitNote", validateSubmitNote, submitNote); // Use the submitNote controller to handle the POST request

// Export the router to be used in the main application
export default router;
