import { BaseEdge, EdgeLabelRenderer } from "reactflow";

function getEdgeSpreadOffset(edgeId) {
  if (!edgeId) return 0;
  let hash = 0;
  for (let i = 0; i < edgeId.length; i += 1) {
    hash = (hash << 5) - hash + edgeId.charCodeAt(i);
    hash |= 0;
  }
  const bucket = ((hash % 5) + 5) % 5; // 0..4
  return (bucket - 2) * 5; // -10, -5, 0, 5, 10
}

function buildArcPath(sourceX, sourceY, targetX, targetY, sourceId, targetId, edgeId) {
  // Self-loops get a compact top arc similar to textbook automata diagrams.
  if (sourceId && targetId && sourceId === targetId) {
    const lift = 64;
    const spread = 34;
    const c1x = sourceX + spread;
    const c1y = sourceY - lift;
    const c2x = targetX - spread;
    const c2y = targetY - lift;
    return {
      path: `M ${sourceX} ${sourceY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${targetX} ${targetY}`,
      labelX: (sourceX + targetX) / 2,
      labelY: sourceY - lift + 8
    };
  }

  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const distance = Math.hypot(dx, dy) || 1;
  const nearThreshold = 245;
  const offsetAmount = getEdgeSpreadOffset(edgeId);
  const nx = -dy / distance;
  const ny = dx / distance;
  const localOffset = distance <= nearThreshold ? offsetAmount * 0.45 : offsetAmount;
  const adjustedTargetX = targetX + nx * localOffset;
  const adjustedTargetY = targetY + ny * localOffset;
  const adjustedDx = adjustedTargetX - sourceX;
  const adjustedDy = adjustedTargetY - sourceY;

  // Adjacent states stay straight; long jumps are curved.
  if (distance <= nearThreshold) {
    return {
      path: `M ${sourceX} ${sourceY} L ${adjustedTargetX} ${adjustedTargetY}`,
      labelX: (sourceX + adjustedTargetX) / 2,
      labelY: (sourceY + adjustedTargetY) / 2 - 12
    };
  }

  const px = -adjustedDy / distance;
  const py = adjustedDx / distance;
  const bendBase = Math.max(30, Math.min(108, distance * 0.32));
  const longJumpBoost = distance > 300 ? 18 : 0;
  const reverseBoost = sourceX > targetX ? 12 : 0;
  const bend = bendBase + longJumpBoost + reverseBoost;
  const sign = sourceX <= targetX ? -1 : 1;

  const c1x = sourceX + adjustedDx * 0.33 + px * bend * sign;
  const c1y = sourceY + adjustedDy * 0.33 + py * bend * sign;
  const c2x = sourceX + adjustedDx * 0.66 + px * bend * sign;
  const c2y = sourceY + adjustedDy * 0.66 + py * bend * sign;
  const labelX = (sourceX + adjustedTargetX) / 2 + px * bend * 0.55 * sign;
  const labelY = (sourceY + adjustedTargetY) / 2 + py * bend * 0.55 * sign;

  return {
    path: `M ${sourceX} ${sourceY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${adjustedTargetX} ${adjustedTargetY}`,
    labelX,
    labelY
  };
}

function TransitionEdge(props) {
  const { id, source, target, sourceX, sourceY, targetX, targetY, style, data, markerEnd } = props;
  const { path: edgePath, labelX, labelY } = buildArcPath(sourceX, sourceY, targetX, targetY, source, target, id);

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

