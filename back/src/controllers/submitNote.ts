// src/controllers/wellnessController.ts
import {
  createDailyEntryStatic,
  DailyEntryStatic,
  Context,
} from "../models/dailyEntryStatic.ts";

export const submitNote = async (
  ctx: Context,
) => { // Specify the type for ctx
  try {
    const body = ctx.request.body;

    if (body.type === "json") {
      const value = await body.value;
      console.log("Incoming value:", value);

      if (value && typeof value === "object") {
        const dailyNote: DailyEntryStatic = {
          ...createDailyEntryStatic(),
          ...(value as DailyEntryStatic),
        };

        ctx.response.body = {
          message: "Daily note submitted successfully",
          data: dailyNote,
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
    ctx.response.body = {
      message: "An error occurred while processing the request",
    };
  }
};
