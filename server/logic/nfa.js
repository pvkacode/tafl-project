import { epsilonClosure } from "./epsilonClosure.js";

export function simulateNFA({
  transitions,
  startState,
  acceptStates,
  inputString
}) {
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
    if (currentStates.size === 0) {
      break;
    }
  }

  const accepted = [...currentStates].some((state) => acceptStates.includes(state));
  return { steps, accepted, finalStates: [...currentStates] };
}

