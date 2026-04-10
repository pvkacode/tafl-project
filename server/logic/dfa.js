export function simulateDFA({
  transitions,
  startState,
  acceptStates,
  inputString
}) {
  const steps = [];
  let currentState = startState;

  for (const symbol of inputString) {
    const nextState = transitions[currentState]?.[symbol];
    steps.push({
      currentState,
      symbol,
      nextState: nextState ?? null,
      transitions: nextState
        ? [{ from: currentState, to: nextState, symbol }]
        : []
    });

    if (!nextState) {
      return { steps, accepted: false, finalStates: [currentState] };
    }
    currentState = nextState;
  }

  const accepted = acceptStates.includes(currentState);
  return { steps, accepted, finalStates: [currentState] };
}

