export function epsilonClosure(stateSet, transitions) {
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

