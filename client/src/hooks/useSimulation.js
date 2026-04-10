import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { simulateDFA, simulateNFA, validateAutomaton } from "../utils/automataEngine";

export function useSimulation({
  type,
  getAutomatonPayload,
  setHighlights,
  clearHighlights
}) {
  const [inputString, setInputString] = useState("");
  const [steps, setSteps] = useState([]);
  const [accepted, setAccepted] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [initialStates, setInitialStates] = useState([]);

  const simulate = useCallback(() => {
    const payload = getAutomatonPayload(inputString);
    const validation = validateAutomaton({ ...payload, type });
    if (!validation.valid) {
      validation.errors.forEach((err) => toast.error(err));
      return;
    }

    const result = type === "dfa" ? simulateDFA(payload) : simulateNFA(payload);
    setSteps(result.steps);
    setAccepted(result.accepted);
    setActiveStepIndex(0);
    setAutoPlay(false);

    if (type === "dfa") {
      setInitialStates(payload.startState ? [payload.startState] : []);
      setHighlights(payload.startState ? [payload.startState] : [], []);
    } else {
      setInitialStates(result.steps[0]?.currentStates ?? (payload.startState ? [payload.startState] : []));
      setHighlights(result.steps[0]?.currentStates ?? [], []);
    }
  }, [getAutomatonPayload, inputString, setHighlights, type]);

  const currentStep = useMemo(
    () => (activeStepIndex > 0 ? steps[activeStepIndex - 1] : null),
    [activeStepIndex, steps]
  );

  useEffect(() => {
    if (!currentStep) {
      setHighlights(initialStates, []);
      return;
    }
    if (type === "dfa") {
      setHighlights([currentStep.nextState].filter(Boolean), currentStep.transitions ?? []);
    } else {
      setHighlights(currentStep.nextStates ?? [], currentStep.transitions ?? []);
    }
  }, [currentStep, initialStates, setHighlights, type]);

  const nextStep = useCallback(() => {
    setActiveStepIndex((prev) => Math.min(prev + 1, steps.length));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetSimulation = useCallback(() => {
    setSteps([]);
    setAccepted(null);
    setAutoPlay(false);
    setActiveStepIndex(0);
    setInitialStates([]);
    clearHighlights();
  }, [clearHighlights]);

  useEffect(() => {
    if (!autoPlay || steps.length === 0 || activeStepIndex >= steps.length) return;
    const timer = setTimeout(() => {
      setActiveStepIndex((prev) => Math.min(prev + 1, steps.length));
    }, speed);
    return () => clearTimeout(timer);
  }, [activeStepIndex, autoPlay, speed, steps.length]);

  useEffect(() => {
    const handler = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        nextStep();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nextStep]);

  const exportSummary = useCallback(() => {
    const lines = steps.map((step, idx) =>
      type === "dfa"
        ? `${idx + 1}. ${step.currentState} -> ${step.symbol} -> ${step.nextState ?? "∅"}`
        : `${idx + 1}. {${step.currentStates.join(",")}} -> ${step.symbol} -> {${step.nextStates.join(",")}}`
    );
    lines.push(`Result: ${accepted ? "ACCEPTED" : "REJECTED"}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "simulation-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [accepted, steps, type]);

  return {
    inputString,
    setInputString,
    steps,
    accepted,
    activeStepIndex,
    simulate,
    nextStep,
    prevStep,
    resetSimulation,
    autoPlay,
    setAutoPlay,
    speed,
    setSpeed,
    exportSummary
  };
}

