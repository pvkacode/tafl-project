import { Handle, Position } from "reactflow";

function StateNode({ data }) {
  const { label, isStart, isAccept, isActive } = data;

  return (
    <div
      className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all
      ${isAccept ? "border-emerald-300" : "border-slate-300"}
      ${isActive ? "ring-4 ring-cyan-400/70 shadow-[0_0_30px_rgba(34,211,238,0.55)]" : ""}
      bg-slate-900 text-slate-100`}
    >
      {isStart && <span className="absolute -left-8 text-cyan-300">-&gt;</span>}
      {isAccept && <div className="absolute inset-[4px] rounded-full border border-emerald-300" />}
      <span className="relative z-10">{label}</span>

      <Handle type="target" position={Position.Left} className="!bg-cyan-300" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-300" />
    </div>
  );
}

export default StateNode;

