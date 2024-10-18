// src/wellness.test.ts
import { Application } from "@oak/oak";
import { superoak } from "https://deno.land/x/superoak@4.8.1/mod.ts";
import endpoints from "../routes/endpoints.ts"; // Import your router

// Create a new application instance for testing
const app = new Application();
app.use(endpoints.routes());
app.use(endpoints.allowedMethods());

Deno.test("POST /api/submitNote", async () => {
  const requestBody = {
    restTime: "08:00",
    wakeUpTime: "06:00",
    sleepDuration: 7,
    sleepQuality: 8,
    feelingAfterWakeUp: 5,
    physicalEnergy: 7,
    mentalEnergy: 6,
    emotionalEnergy: 5,
    mood: 7,
    discipline: 5,
    courage: 6,
    temperance: 5,
    wisdom: 6,
    productivity: 7,
    water: 2,
    holotropicalBreathing: 1,
    coldShower: 1,
    meditation: 1,
    stretch: 1,
    workout: 1,
    reading: 1,
    web3: 1,
    musicPlaying: 1,
    timeTrack: 1,
  };

  const request = await superoak(app);
  await request
    .post("/api/submitNote")
    .send(requestBody)
    .expect(200) // Expect a 200 OK response
    .expectBodyContains("Daily note submitted successfully") // Check response message
    .expectBodyContains(requestBody.restTime); // Check if the request body is included in the response
});
