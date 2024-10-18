// src/server.ts
import { Application } from "@oak/oak";
import endpoints from "./routes/endpoints.ts"; // Import wellness routes

const app = new Application();

// Use the imported routes
app.use(endpoints.routes());
app.use(endpoints.allowedMethods());

// Start the server
const PORT = 8000;
console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
