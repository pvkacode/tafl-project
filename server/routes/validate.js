import { Router } from "express";
import { validateAutomaton } from "../logic/validate.js";

const router = Router();

router.post("/", (req, res) => {
  const { type = "dfa" } = req.body;
  const result = validateAutomaton({ ...req.body, type });
  return res.json(result);
});

export default router;

