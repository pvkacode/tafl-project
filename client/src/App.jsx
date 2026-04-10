import { useMemo } from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import SimulationPanel from "./components/SimulationPanel";
import StateNode from "./components/StateNode";
import TransitionEdge from "./components/TransitionEdge";
import { useAutomata } from "./hooks/useAutomata";
import { useSimulation } from "./hooks/useSimulation";

function App() {
  const automata = useAutomata();
  const simulation = useSimulation({
    type: automata.type,
    getAutomatonPayload: automata.getAutomatonPayload,
    setHighlights: automata.setHighlights,
    clearHighlights: automata.clearHighlights
  });

  const nodeTypes = useMemo(() => ({ stateNode: StateNode }), []);
  const edgeTypes = useMemo(() => ({ transitionEdge: TransitionEdge }), []);

  const exportAutomaton = () => {
    const payload = automata.getAutomatonPayload(simulation.inputString);
    const blob = new Blob([JSON.stringify({ type: automata.type, ...payload }, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "automaton.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-3 bg-slate-950 p-3 lg:grid-cols-[320px_1fr]">
      <Sidebar
        type={automata.type}
        setType={automata.setType}
        alphabetInput={automata.alphabetInput}
        setAlphabetInput={automata.setAlphabetInput}
        nodes={automata.nodes}
        addState={automata.addState}
        setStartState={automata.setStartState}
        toggleAccept={automata.toggleAccept}
        deleteState={automata.deleteState}
        renameState={automata.renameState}
        loadPreset={(preset) => {
          automata.loadPreset(preset);
          simulation.resetSimulation();
        }}
        exportAutomaton={exportAutomaton}
      />

      <main className="grid h-full grid-rows-[1fr_300px] gap-3">
        <Canvas
          nodes={automata.nodes}
          edges={automata.edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={automata.onNodesChange}
          onEdgesChange={automata.onEdgesChange}
          onConnect={automata.addLabeledEdge}
          onPaneDoubleClick={(_, pane) => automata.addStateAt(pane)}
          onNodeClick={(_, node) => automata.renameState(node.id)}
          onNodeContextMenu={(event, node) => {
            event.preventDefault();
            const action = window.prompt("Action: start | accept | delete");
            if (!action) return;
            if (action === "start") automata.setStartState(node.id);
            if (action === "accept") automata.toggleAccept(node.id);
            if (action === "delete") automata.deleteState(node.id);
          }}
        />

        <SimulationPanel
          type={automata.type}
          inputString={simulation.inputString}
          setInputString={simulation.setInputString}
          simulate={simulation.simulate}
          nextStep={simulation.nextStep}
          prevStep={simulation.prevStep}
          resetSimulation={simulation.resetSimulation}
          autoPlay={simulation.autoPlay}
          setAutoPlay={simulation.setAutoPlay}
          speed={simulation.speed}
          setSpeed={simulation.setSpeed}
          activeStepIndex={simulation.activeStepIndex}
          steps={simulation.steps}
          accepted={simulation.accepted}
          exportSummary={simulation.exportSummary}
        />
      </main>
    </div>
  );
}

export default App;

