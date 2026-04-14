import { formatDfaStep } from "../utils/dfaEngine";
import { formatNfaStep } from "../utils/nfaEngine";

function SimulationPanel({
  type,
  inputString,
  setInputString,
  simulate,
  nextStep,
  prevStep,
  resetSimulation,
  autoPlay,
  setAutoPlay,
  speed,
  setSpeed,
  activeStepIndex,
  steps,
  accepted,
  exportSummary,
  canStepForward,
  canStepBackward
}) {
  const currentSymbol = inputString[activeStepIndex] ?? null;
  const remaining = inputString.slice(activeStepIndex);

  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          placeholder="Input string"
          className="min-w-48 flex-1 rounded bg-slate-800 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring-1"
        />
        <button className="rounded bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-900" onClick={simulate}>
          Simulate
        </button>
        <button
          className="rounded bg-slate-700 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          onClick={prevStep}
          disabled={!canStepBackward}
        >
          Previous
        </button>
        <button
          className="rounded bg-slate-700 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          onClick={nextStep}
          disabled={!canStepForward}
        >
          Next
        </button>
        <button className="rounded bg-slate-700 px-3 py-2 text-sm" onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? "Stop Auto-Play" : "Auto-Play"}
        </button>
        <button className="rounded bg-slate-700 px-3 py-2 text-sm" onClick={resetSimulation}>
          Reset
        </button>
        <button className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold" onClick={exportSummary}>
          Export Steps
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs uppercase text-slate-400">Auto-play speed</span>
        <input type="range" min="250" max="2000" step="50" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        <span className="text-xs text-slate-300">{speed}ms</span>
      </div>

      <div className="rounded bg-slate-800 p-3 text-sm">
        <div className="mb-2 text-slate-300">Input progress</div>
        <div className="font-mono text-lg">
          <span className="text-slate-500">{inputString.slice(0, activeStepIndex)}</span>
          <span className="bg-cyan-500/40 px-1">{currentSymbol ?? " "}</span>
          <span>{remaining.slice(1)}</span>
        </div>
      </div>

      {accepted !== null && (
        <div className={`rounded px-3 py-2 text-sm font-semibold ${accepted ? "bg-emerald-700/30 text-emerald-300" : "bg-rose-700/30 text-rose-300"}`}>
          {accepted ? "ACCEPTED" : "REJECTED"}
        </div>
      )}

      <div className="min-h-24 flex-1 overflow-auto rounded bg-slate-950 p-3">
        <div className="mb-2 text-xs uppercase text-slate-400">Step Log</div>
        {steps.length === 0 ? (
          <p className="text-sm text-slate-500">No simulation steps yet.</p>
        ) : (
          steps.map((step, idx) => (
            <div key={`${idx}-${step.symbol}`} className={`mb-1 rounded px-2 py-1 text-sm ${idx === activeStepIndex - 1 ? "bg-cyan-500/20" : ""}`}>
              {type === "dfa" ? formatDfaStep(step) : formatNfaStep(step)}
            </div>
          ))
        )}
      </div>
      <div className="text-xs text-slate-500">Shortcut: press Space for Next Step.</div>
    </div>
  );
}

export default SimulationPanel;

