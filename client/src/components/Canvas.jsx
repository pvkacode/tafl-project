import ReactFlow, { Background, Controls, MarkerType, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

function Canvas({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onPaneDoubleClick,
  onNodeClick,
  onNodeContextMenu
}) {
  return (
    <div className="h-full w-full rounded-xl border border-slate-800 bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneDoubleClick={onPaneDoubleClick}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        defaultEdgeOptions={{
          markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 10, height: 10 }
        }}
      >
        <Background color="#334155" gap={24} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Canvas;

