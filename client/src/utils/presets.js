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
    id: "dfa-binary-divisible-by-3",
    label: "DFA: binary divisible by 3",
    type: "dfa",
    alphabet: ["0", "1"],
    nodes: [
      { id: "r0", position: { x: 140, y: 170 }, data: { label: "r0", isStart: true, isAccept: true }, type: "stateNode" },
      { id: "r1", position: { x: 340, y: 80 }, data: { label: "r1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "r2", position: { x: 540, y: 170 }, data: { label: "r2", isStart: false, isAccept: false }, type: "stateNode" }
    ],
    edges: [
      { id: "r0-r0-0", source: "r0", target: "r0", label: "0", type: "transitionEdge" },
      { id: "r0-r1-1", source: "r0", target: "r1", label: "1", type: "transitionEdge" },
      { id: "r1-r2-0", source: "r1", target: "r2", label: "0", type: "transitionEdge" },
      { id: "r1-r0-1", source: "r1", target: "r0", label: "1", type: "transitionEdge" },
      { id: "r2-r1-0", source: "r2", target: "r1", label: "0", type: "transitionEdge" },
      { id: "r2-r2-1", source: "r2", target: "r2", label: "1", type: "transitionEdge" }
    ]
  },
  {
    id: "dfa-contains-101",
    label: 'DFA: contains "101"',
    type: "dfa",
    alphabet: ["0", "1"],
    nodes: [
      { id: "p0", position: { x: 100, y: 180 }, data: { label: "p0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "p1", position: { x: 290, y: 80 }, data: { label: "p1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "p2", position: { x: 480, y: 80 }, data: { label: "p2", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "p3", position: { x: 670, y: 180 }, data: { label: "p3", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "p0-p1-1", source: "p0", target: "p1", label: "1", type: "transitionEdge" },
      { id: "p0-p0-0", source: "p0", target: "p0", label: "0", type: "transitionEdge" },
      { id: "p1-p1-1", source: "p1", target: "p1", label: "1", type: "transitionEdge" },
      { id: "p1-p2-0", source: "p1", target: "p2", label: "0", type: "transitionEdge" },
      { id: "p2-p0-0", source: "p2", target: "p0", label: "0", type: "transitionEdge" },
      { id: "p2-p3-1", source: "p2", target: "p3", label: "1", type: "transitionEdge" },
      { id: "p3-p3-0", source: "p3", target: "p3", label: "0", type: "transitionEdge" },
      { id: "p3-p3-1", source: "p3", target: "p3", label: "1", type: "transitionEdge" }
    ]
  },
  {
    id: "dfa-odd-ones",
    label: "DFA: odd number of 1s",
    type: "dfa",
    alphabet: ["0", "1"],
    nodes: [
      { id: "o0", position: { x: 170, y: 170 }, data: { label: "o0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "o1", position: { x: 430, y: 170 }, data: { label: "o1", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "o0-o0-0", source: "o0", target: "o0", label: "0", type: "transitionEdge" },
      { id: "o1-o1-0", source: "o1", target: "o1", label: "0", type: "transitionEdge" },
      { id: "o0-o1-1", source: "o0", target: "o1", label: "1", type: "transitionEdge" },
      { id: "o1-o0-1", source: "o1", target: "o0", label: "1", type: "transitionEdge" }
    ]
  },
  {
    id: "dfa-no-consecutive-11",
    label: 'DFA: no consecutive "11"',
    type: "dfa",
    alphabet: ["0", "1"],
    nodes: [
      { id: "c0", position: { x: 130, y: 180 }, data: { label: "c0", isStart: true, isAccept: true }, type: "stateNode" },
      { id: "c1", position: { x: 360, y: 100 }, data: { label: "c1", isStart: false, isAccept: true }, type: "stateNode" },
      { id: "dead", position: { x: 580, y: 180 }, data: { label: "dead", isStart: false, isAccept: false }, type: "stateNode" }
    ],
    edges: [
      { id: "c0-c0-0", source: "c0", target: "c0", label: "0", type: "transitionEdge" },
      { id: "c0-c1-1", source: "c0", target: "c1", label: "1", type: "transitionEdge" },
      { id: "c1-c0-0", source: "c1", target: "c0", label: "0", type: "transitionEdge" },
      { id: "c1-dead-1", source: "c1", target: "dead", label: "1", type: "transitionEdge" },
      { id: "dead-dead-0", source: "dead", target: "dead", label: "0", type: "transitionEdge" },
      { id: "dead-dead-1", source: "dead", target: "dead", label: "1", type: "transitionEdge" }
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
  },
  {
    id: "nfa-ends-with-ab",
    label: 'NFA: ends with "ab"',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "n0", position: { x: 120, y: 190 }, data: { label: "n0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "n1", position: { x: 330, y: 80 }, data: { label: "n1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "n2", position: { x: 540, y: 190 }, data: { label: "n2", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "n0-n0-a", source: "n0", target: "n0", label: "a", type: "transitionEdge" },
      { id: "n0-n0-b", source: "n0", target: "n0", label: "b", type: "transitionEdge" },
      { id: "n0-n1-a", source: "n0", target: "n1", label: "a", type: "transitionEdge" },
      { id: "n1-n2-b", source: "n1", target: "n2", label: "b", type: "transitionEdge" }
    ]
  },
  {
    id: "nfa-even-a",
    label: 'NFA: even number of "a"',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "e0", position: { x: 160, y: 160 }, data: { label: "e0", isStart: true, isAccept: true }, type: "stateNode" },
      { id: "e1", position: { x: 420, y: 160 }, data: { label: "e1", isStart: false, isAccept: false }, type: "stateNode" }
    ],
    edges: [
      { id: "e0-e1-a", source: "e0", target: "e1", label: "a", type: "transitionEdge" },
      { id: "e1-e0-a", source: "e1", target: "e0", label: "a", type: "transitionEdge" },
      { id: "e0-e0-b", source: "e0", target: "e0", label: "b", type: "transitionEdge" },
      { id: "e1-e1-b", source: "e1", target: "e1", label: "b", type: "transitionEdge" }
    ]
  },
  {
    id: "nfa-a-star-b-star",
    label: 'NFA: language a* b*',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "m0", position: { x: 140, y: 160 }, data: { label: "m0", isStart: true, isAccept: true }, type: "stateNode" },
      { id: "m1", position: { x: 420, y: 160 }, data: { label: "m1", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "m0-m0-a", source: "m0", target: "m0", label: "a", type: "transitionEdge" },
      { id: "m0-m1-b", source: "m0", target: "m1", label: "b", type: "transitionEdge" },
      { id: "m1-m1-b", source: "m1", target: "m1", label: "b", type: "transitionEdge" }
    ]
  },
  {
    id: "nfa-begins-with-ab",
    label: 'NFA: begins with "ab"',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "b0", position: { x: 110, y: 170 }, data: { label: "b0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "b1", position: { x: 320, y: 90 }, data: { label: "b1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "b2", position: { x: 530, y: 170 }, data: { label: "b2", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "b0-b1-a", source: "b0", target: "b1", label: "a", type: "transitionEdge" },
      { id: "b1-b2-b", source: "b1", target: "b2", label: "b", type: "transitionEdge" },
      { id: "b2-b2-a", source: "b2", target: "b2", label: "a", type: "transitionEdge" },
      { id: "b2-b2-b", source: "b2", target: "b2", label: "b", type: "transitionEdge" }
    ]
  },
  {
    id: "nfa-contains-baa",
    label: 'NFA: contains "baa"',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "k0", position: { x: 90, y: 180 }, data: { label: "k0", isStart: true, isAccept: false }, type: "stateNode" },
      { id: "k1", position: { x: 280, y: 90 }, data: { label: "k1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "k2", position: { x: 470, y: 90 }, data: { label: "k2", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "k3", position: { x: 660, y: 180 }, data: { label: "k3", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "k0-k0-ab", source: "k0", target: "k0", label: "a,b", type: "transitionEdge" },
      { id: "k0-k1-b", source: "k0", target: "k1", label: "b", type: "transitionEdge" },
      { id: "k1-k2-a", source: "k1", target: "k2", label: "a", type: "transitionEdge" },
      { id: "k2-k3-a", source: "k2", target: "k3", label: "a", type: "transitionEdge" },
      { id: "k3-k3-ab", source: "k3", target: "k3", label: "a,b", type: "transitionEdge" }
    ]
  },
  {
    id: "nfa-even-b-using-epsilon",
    label: 'NFA: even number of "b" (ε-moves)',
    type: "nfa",
    alphabet: ["a", "b"],
    nodes: [
      { id: "u0", position: { x: 120, y: 170 }, data: { label: "u0", isStart: true, isAccept: true }, type: "stateNode" },
      { id: "u1", position: { x: 360, y: 90 }, data: { label: "u1", isStart: false, isAccept: false }, type: "stateNode" },
      { id: "u2", position: { x: 580, y: 170 }, data: { label: "u2", isStart: false, isAccept: true }, type: "stateNode" }
    ],
    edges: [
      { id: "u0-u0-a", source: "u0", target: "u0", label: "a", type: "transitionEdge" },
      { id: "u2-u2-a", source: "u2", target: "u2", label: "a", type: "transitionEdge" },
      { id: "u0-u1-b", source: "u0", target: "u1", label: "b", type: "transitionEdge" },
      { id: "u1-u2-ε", source: "u1", target: "u2", label: "ε", type: "transitionEdge" },
      { id: "u2-u1-b", source: "u2", target: "u1", label: "b", type: "transitionEdge" },
      { id: "u1-u0-ε", source: "u1", target: "u0", label: "ε", type: "transitionEdge" }
    ]
  }
];

