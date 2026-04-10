export function validateAutomaton({
  type,
  states,
  alphabet,
  transitions,
  startState,
  acceptStates
}) {
  const errors = [];
  const stateSet = new Set(states);

  if (!states?.length) errors.push("At least one state is required.");
  if (!startState) errors.push("Start state is required.");
  if (startState && !stateSet.has(startState)) {
    errors.push("Start state must exist in states list.");
  }

  for (const finalState of acceptStates ?? []) {
    if (!stateSet.has(finalState)) {
      errors.push(`Accept state "${finalState}" does not exist.`);
    }
  }

  for (const [fromState, symbolsMap] of Object.entries(transitions ?? {})) {
    if (!stateSet.has(fromState)) {
      errors.push(`Transition source "${fromState}" is not a valid state.`);
      continue;
    }
    for (const [symbol, targets] of Object.entries(symbolsMap)) {
      if (type === "dfa" && symbol === "ε") {
        errors.push("DFA cannot contain epsilon transitions.");
      }
      if (symbol !== "ε" && !alphabet.includes(symbol)) {
        errors.push(`Symbol "${symbol}" is not present in the alphabet.`);
      }

      if (type === "dfa") {
        if (Array.isArray(targets) && targets.length > 1) {
          errors.push(`DFA transition "${fromState}" on "${symbol}" has multiple targets.`);
        }
      }

      const targetList = Array.isArray(targets) ? targets : [targets];
      for (const target of targetList) {
        if (!stateSet.has(target)) {
          errors.push(`Transition target "${target}" is not a valid state.`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

