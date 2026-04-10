export function formatDfaStep(step) {
  return `${step.currentState} -> ${step.symbol} -> ${step.nextState ?? "∅"}`;
}

