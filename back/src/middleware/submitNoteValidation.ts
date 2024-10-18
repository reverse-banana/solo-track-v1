import { Context } from "../models/dailyEntryStatic.ts";

// Middleware function to validate the submitted note
export const validateSubmitNote = async (ctx: Context, next: () => Promise<void>) => {
    const body = ctx.request.body;
  
    // Check if the request body type is JSON
    if (body.type !== "json") {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { message: "Expected JSON input" };
      return;
    }
  
    // Extract and validate the value from the request body
    const value = await body.value;
    if (!value || typeof value !== 'object') {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { message: "Invalid input data" };
      return;
    }
  
    // If validation passes, call the next middleware/controller
    await next();
  };
