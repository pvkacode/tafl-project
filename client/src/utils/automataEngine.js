function epsilonClosure(stateSet, transitions) {
  const closure = new Set(stateSet);
  const stack = [...stateSet];

  while (stack.length > 0) {
    const current = stack.pop();
    const epsTargets = transitions[current]?.["ε"] ?? [];
    for (const target of epsTargets) {
      if (!closure.has(target)) {
        closure.add(target);
        stack.push(target);
      }
    }
  }

  return closure;
}

export function validateAutomaton({ type, states, alphabet, transitions, startState, acceptStates }) {
  const errors = [];
  const stateSet = new Set(states);

  if (!states?.length) errors.push("At least one state is required.");
  if (!startState) errors.push("Start state is required.");
  if (startState && !stateSet.has(startState)) errors.push("Start state must exist in states list.");

  for (const finalState of acceptStates ?? []) {
    if (!stateSet.has(finalState)) errors.push(`Accept state "${finalState}" does not exist.`);
  }

  for (const [fromState, symbolsMap] of Object.entries(transitions ?? {})) {
    if (!stateSet.has(fromState)) {
      errors.push(`Transition source "${fromState}" is not a valid state.`);
      continue;
    }

    for (const [symbol, targets] of Object.entries(symbolsMap)) {
      if (type === "dfa" && symbol === "ε") errors.push("DFA cannot contain epsilon transitions.");
      if (symbol !== "ε" && !alphabet.includes(symbol)) errors.push(`Symbol "${symbol}" is not present in the alphabet.`);

      if (type === "dfa" && Array.isArray(targets) && targets.length > 1) {
        errors.push(`DFA transition "${fromState}" on "${symbol}" has multiple targets.`);
      }

      const targetList = Array.isArray(targets) ? targets : [targets];
      for (const target of targetList) {
        if (!stateSet.has(target)) errors.push(`Transition target "${target}" is not a valid state.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function simulateDFA({ transitions, startState, acceptStates, inputString }) {
  const steps = [];
  let currentState = startState;

  for (const symbol of inputString) {
    const nextState = transitions[currentState]?.[symbol];
    steps.push({
      currentState,
      symbol,
      nextState: nextState ?? null,
      transitions: nextState ? [{ from: currentState, to: nextState, symbol }] : []
    });

    if (!nextState) {
      return { steps, accepted: false };
    }
    currentState = nextState;
  }

  return { steps, accepted: acceptStates.includes(currentState) };
}

export function simulateNFA({ transitions, startState, acceptStates, inputString }) {
  const steps = [];
  let currentStates = epsilonClosure(new Set([startState]), transitions);

  for (const symbol of inputString) {
    const rawNext = new Set();
    const traversed = [];

    for (const state of currentStates) {
      const nextList = transitions[state]?.[symbol] ?? [];
      for (const target of nextList) {
        rawNext.add(target);
        traversed.push({ from: state, to: target, symbol });
      }
    }

    const nextStates = epsilonClosure(rawNext, transitions);
    steps.push({
      currentStates: [...currentStates],
      symbol,
      nextStates: [...nextStates],
      transitions: traversed
    });

    currentStates = nextStates;
    if (currentStates.size === 0) break;
  }

  const accepted = [...currentStates].some((state) => acceptStates.includes(state));
  return { steps, accepted };
}

