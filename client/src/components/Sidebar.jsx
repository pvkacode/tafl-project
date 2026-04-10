import { presets } from "../utils/presets";

function Sidebar({
  type,
  setType,
  alphabetInput,
  setAlphabetInput,
  nodes,
  addState,
  setStartState,
  toggleAccept,
  deleteState,
  renameState,
  loadPreset,
  exportAutomaton
}) {
  return (
    <aside className="flex h-full w-full flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h1 className="text-lg font-bold text-cyan-300">Finite Automata Simulator</h1>

      <div className="space-y-2">
        <label className="text-xs uppercase text-slate-400">Automata Type</label>
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-1">
          {["dfa", "nfa"].map((t) => (
            <button
              key={t}
              className={`rounded-md px-3 py-2 text-sm font-medium ${type === t ? "bg-cyan-500 text-slate-900" : "bg-slate-700 text-slate-200"}`}
              onClick={() => setType(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase text-slate-400">Alphabet (comma-separated)</label>
        <input
          value={alphabetInput}
          onChange={(e) => setAlphabetInput(e.target.value)}
          className="w-full rounded bg-slate-800 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring-1"
          placeholder={type === "dfa" ? "0,1" : "a,b,ε(optional on edges only)"}
        />
      </div>

      <button onClick={addState} className="rounded bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-900">
        Add State
      </button>

      <div className="space-y-2">
        <label className="text-xs uppercase text-slate-400">Presets</label>
        <div className="space-y-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="w-full rounded bg-slate-800 px-3 py-2 text-left text-xs hover:bg-slate-700"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto">
        <label className="text-xs uppercase text-slate-400">States</label>
        {nodes.map((node) => (
          <div key={node.id} className="rounded bg-slate-800 p-2 text-xs">
            <div className="mb-2 flex items-center justify-between">
              <span>{node.data.label}</span>
              <button className="text-cyan-300" onClick={() => renameState(node.id)}>
                rename
              </button>
            </div>
            <div className="flex gap-1">
              <button className="rounded bg-slate-700 px-2 py-1" onClick={() => setStartState(node.id)}>
                start
              </button>
              <button className="rounded bg-slate-700 px-2 py-1" onClick={() => toggleAccept(node.id)}>
                accept
              </button>
              <button className="rounded bg-rose-700/70 px-2 py-1" onClick={() => deleteState(node.id)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={exportAutomaton} className="rounded bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900">
        Export Automaton JSON
      </button>
    </aside>
  );
}

export default Sidebar;

