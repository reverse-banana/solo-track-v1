// src/routes/wellness.ts
import { Router } from "@oak/oak";
import { DailyEntryStatic, createDailyEntryStatic } from "../models/dailyEntryStatic.ts";

const router = new Router();

router.post("/api/submitNote", async (ctx) => {
  try {
    // Get the request body
    const body = ctx.request.body;

    // Check if the body is JSON
    if (body.type() === "json") {
      const value = await body.json();
      console.log("Incoming value:", value);

      if (value && typeof value === 'object') {
        const dailyNote: DailyEntryStatic = { 
          ...createDailyEntryStatic(), 
          ...(value as DailyEntryStatic) // Use the destructured value
        }; 

        ctx.response.body = { 
          message: "Daily note submitted successfully", 
          data: dailyNote 
        };
      } else {
        ctx.response.status = 400; // Bad Request
        ctx.response.body = { message: "Invalid input data" };
      }
    } else {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { message: "Expected JSON input" };
    }
  } catch (error) {
    console.error("Error processing request:", error);
    ctx.response.status = 500; // Internal Server Error
    ctx.response.body = { message: "An error occurred while processing the request" };
  }
});

export default router;