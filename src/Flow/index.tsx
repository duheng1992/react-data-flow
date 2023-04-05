import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  type Connection,
  type Edge,
  type Node,
  Panel,
} from "reactflow";

// this is important! You need to import the styles from the lib to make it work
import "reactflow/dist/style.css";

import "./Flow.css";
import Toolbar from "./Toolbar";
import LeftPanel from "./LeftPanel";
import {
  initialNodes,
  initialEdges,
  nodeTypes,
  getNewNode,
} from "./service/node";

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [reactFlowInstance, setReactFlowInstance] = useState();
  const reactFlowWrapper = useRef<any>(null);

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (reactFlowInstance) {
        const position = (reactFlowInstance as any).project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        setNodes((nds) => nds.concat(getNewNode(type, position)));
      }
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div className="Flow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={(instance: any) => setReactFlowInstance(instance)}
          onNodeContextMenu={(e: any, node: Node) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Panel position="top-left">
            <LeftPanel />
          </Panel>
          <Controls showFitView={false} showZoom={false}>
            <Toolbar />
          </Controls>
          <Background />
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
