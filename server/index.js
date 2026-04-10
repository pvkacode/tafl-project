import express from "express";
import cors from "cors";
import simulateRouter from "./routes/simulate.js";
import validateRouter from "./routes/validate.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/simulate", simulateRouter);
app.use("/api/validate", validateRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
