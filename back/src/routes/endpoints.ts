// src/routes/wellness.ts
import { Router } from "@oak/oak";
import { submitNote } from "../controllers/submitNote.ts";
import { validateSubmitNote } from "../middleware/submitNoteValidation.ts";
import { Context } from "../models/dailyEntryStatic.ts";



const router = new Router();

router.post("/api/submitNote", validateSubmitNote, submitNote);


export default router;
