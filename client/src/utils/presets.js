export const presets = [
  {
    id: "dfa-end-01",
    label: 'DFA: ends with "01"',
    type: "dfa",
    alphabet: ["0", "1"],
    nodes: [
      { id: "q0", position: { x: 120, y: 180 }, data: { label: "q0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "q1", position: { x: 320, y: 100 }, data: { label: "q1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "q2", position: { x: 520, y: 180 }, data: { label: "q2", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "q0-q0-1", source: "q0", target: "q0", label: "1", type: "transitionEdge" },
      { id: "q0-q1-0", source: "q0", target: "q1", label: "0", type: "transitionEdge" },
      { id: "q1-q1-0", source: "q1", target: "q1", label: "0", type: "transitionEdge" },
      { id: "q1-q2-1", source: "q1", target: "q2", label: "1", type: "transitionEdge" },
      { id: "q2-q1-0", source: "q2", target: "q1", label: "0", type: "transitionEdge" },
      { id: "q2-q0-1", source: "q2", target: "q0", label: "1", type: "transitionEdge" }
    ]
  },
  {
    id: "dfa-even-zeros",
    label: "DFA: even number of 0s",
    type: "dfa",
    alphabet: ["0", "1"],
    nodes: [
      { id: "even", position: { x: 160, y: 160 }, data: { label: "even", isStart: true, isAccept: true }, type: "stateNode" },
      { id: "odd", position: { x: 380, y: 160 }, data: { label: "odd", isStart: false, isAccept: false }, type: "stateNode" }
    ],
    edges: [
      { id: "even-odd-0", source: "even", target: "odd", label: "0", type: "transitionEdge" },
      { id: "odd-even-0", source: "odd", target: "even", label: "0", type: "transitionEdge" },
      { id: "even-even-1", source: "even", target: "even", label: "1", type: "transitionEdge" },
      { id: "odd-odd-1", source: "odd", target: "odd", label: "1", type: "transitionEdge" }
    ]
  },
  {
    id: "nfa-contains-ab",
    label: 'NFA: contains "ab"',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "s0", position: { x: 100, y: 170 }, data: { label: "s0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "s1", position: { x: 300, y: 80 }, data: { label: "s1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "s2", position: { x: 500, y: 170 }, data: { label: "s2", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "s0-s0-ab", source: "s0", target: "s0", label: "a,b", type: "transitionEdge" },
      { id: "s0-s1-a", source: "s0", target: "s1", label: "a", type: "transitionEdge" },
      { id: "s1-s2-b", source: "s1", target: "s2", label: "b", type: "transitionEdge" },
      { id: "s2-s2-ab", source: "s2", target: "s2", label: "a,b", type: "transitionEdge" }
    ]
  }
];

