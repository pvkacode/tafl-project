import { useCallback, useMemo, useState } from "react";
import { applyNodeChanges, applyEdgeChanges } from "reactflow";

export function useAutomata() {
  const [type, setType] = useState("dfa");
  const [alphabetInput, setAlphabetInput] = useState("0,1");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const alphabet = useMemo(
    () =>
      alphabetInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [alphabetInput]
  );

  const addState = useCallback(() => {
    const id = `q${nodes.length}`;
    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "stateNode",
        position: { x: 100 + prev.length * 40, y: 100 + prev.length * 30 },
        data: { label: id, isStart: prev.length === 0, isAccept: false, isActive: false }
      }
    ]);
  }, [nodes.length]);

  const addStateAt = useCallback((position) => {
    setNodes((prev) => {
      const id = `q${prev.length}`;
      return [
        ...prev,
        {
          id,
          type: "stateNode",
          position,
          data: { label: id, isStart: prev.length === 0, isAccept: false, isActive: false }
        }
      ];
    });
  }, []);

  const renameState = useCallback((id) => {
    const newLabel = window.prompt("Rename state");
    if (!newLabel) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, id: newLabel, data: { ...n.data, label: newLabel } } : n))
    );
    setEdges((prev) =>
      prev.map((e) => ({
        ...e,
        source: e.source === id ? newLabel : e.source,
        target: e.target === id ? newLabel : e.target
      }))
    );
  }, []);

  const setStartState = useCallback((id) => {
    setNodes((prev) => prev.map((n) => ({ ...n, data: { ...n.data, isStart: n.id === id } })));
  }, []);

  const toggleAccept = useCallback((id) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, isAccept: !n.data.isAccept } } : n))
    );
  }, []);

  const deleteState = useCallback((id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
  }, []);

  const addLabeledEdge = useCallback((connection) => {
    const rawLabel = window.prompt(`Transition symbols (comma-separated${type === "nfa" ? ", include ε if needed" : ""})`);
    if (!rawLabel) return;
    const label = rawLabel
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(",");
    setEdges((prev) => [
      ...prev,
      {
        id: `${connection.source}-${connection.target}-${Date.now()}`,
        source: connection.source,
        target: connection.target,
        label,
        type: "transitionEdge",
        data: { isActive: false }
      }
    ]);
  }, [type]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const getAutomatonPayload = useCallback(
    (inputString) => {
      const states = nodes.map((n) => n.id);
      const startState = nodes.find((n) => n.data.isStart)?.id;
      const acceptStates = nodes.filter((n) => n.data.isAccept).map((n) => n.id);

      const transitions = {};
      for (const edge of edges) {
        const symbols = String(edge.label ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        if (!transitions[edge.source]) transitions[edge.source] = {};
        for (const symbol of symbols) {
          if (type === "dfa") {
            transitions[edge.source][symbol] = edge.target;
          } else {
            if (!transitions[edge.source][symbol]) transitions[edge.source][symbol] = [];
            transitions[edge.source][symbol].push(edge.target);
          }
        }
      }

      return { states, alphabet, transitions, startState, acceptStates, inputString };
    },
    [alphabet, edges, nodes, type]
  );

  const loadPreset = useCallback((preset) => {
    setType(preset.type);
    setAlphabetInput(preset.alphabet.join(","));
    setNodes(preset.nodes.map((node) => ({ ...node, data: { ...node.data, isActive: false } })));
    setEdges(preset.edges.map((edge) => ({ ...edge, data: { isActive: false } })));
  }, []);

  const setHighlights = useCallback((activeStates, activeTransitions) => {
    const activeSet = new Set(activeStates);
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        data: { ...n.data, isActive: activeSet.has(n.id) }
      }))
    );

    setEdges((prev) =>
      prev.map((e) => {
        const isActive = activeTransitions.some(
          (t) => t.from === e.source && t.to === e.target && String(e.label).split(",").map((s) => s.trim()).includes(t.symbol)
        );
        return { ...e, data: { ...e.data, isActive } };
      })
    );
  }, []);

  const clearHighlights = useCallback(() => {
    setNodes((prev) => prev.map((n) => ({ ...n, data: { ...n.data, isActive: false } })));
    setEdges((prev) => prev.map((e) => ({ ...e, data: { ...e.data, isActive: false } })));
  }, []);

  return {
    type,
    setType,
    alphabetInput,
    setAlphabetInput,
    nodes,
    edges,
    setEdges,
    addState,
    addStateAt,
    renameState,
    setStartState,
    toggleAccept,
    deleteState,
    addLabeledEdge,
    onNodesChange,
    onEdgesChange,
    getAutomatonPayload,
    loadPreset,
    setHighlights,
    clearHighlights
  };
}

