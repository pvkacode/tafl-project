export function formatNfaStep(step) {
  return `{${step.currentStates.join(",")}} -> ${step.symbol} -> {${step.nextStates.join(",")}}`;
}

