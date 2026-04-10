import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";

function TransitionEdge(props) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, data, markerEnd } = props;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });

  const active = data?.isActive;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: active ? "#22d3ee" : "#64748b",
          strokeWidth: active ? 3 : 2
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all"
          }}
          className={`rounded px-2 py-1 text-xs ${active ? "bg-cyan-400 text-slate-900" : "bg-slate-800 text-slate-200"}`}
        >
          {props.label || "?"}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default TransitionEdge;

