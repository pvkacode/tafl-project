import { Router } from "express";
import { simulateDFA } from "../logic/dfa.js";
import { simulateNFA } from "../logic/nfa.js";
import { validateAutomaton } from "../logic/validate.js";

const router = Router();

router.post("/dfa", (req, res) => {
  const payload = req.body;
  const validation = validateAutomaton({ ...payload, type: "dfa" });
  if (!validation.valid) {
    return res.status(400).json(validation);
  }

  const result = simulateDFA(payload);
  return res.json(result);
});

router.post("/nfa", (req, res) => {
  const payload = req.body;
  const validation = validateAutomaton({ ...payload, type: "nfa" });
  if (!validation.valid) {
    return res.status(400).json(validation);
  }

  const result = simulateNFA(payload);
  return res.json(result);
});

export default router;

