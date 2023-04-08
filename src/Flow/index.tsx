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
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

import "./Flow.css";
import Toolbar from "./components/Toolbar";
import PanelComponent from "./components/Panel";
import {
  initialNodes,
  initialEdges,
  nodeTypes,
  getNewNode,
} from "./service/node";
// import ConnectionEdge from "./nodes/ConnectionEdge";

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
  const [reactFlowInstance, setReactFlowInstance] = useState<any>();
  const reactFlowWrapper = useRef<any>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

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
      const nodeType = event.dataTransfer.getData(
        "application/reactflow/nodeType"
      );

      let nodePayload: any = null;
      try {
        const payload = event.dataTransfer.getData(
          "application/reactflow/payload"
        );
        if (payload) {
          nodePayload = JSON.parse(payload);
        }
      } catch (e) {
        console.error(e);
      }

      // check if the dropped element is valid
      if (nodeType === "undefined" || !nodeType) {
        return;
      }

      if (reactFlowInstance) {
        const position = (reactFlowInstance as any).project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        setNodes((nds) =>
          nds.concat(getNewNode(nodeType, position, nodePayload))
        );
      }
    },
    [reactFlowInstance]
  );

  const edgesWithUpdatedTypes = edges.map((edge) => {
    // 找到该连线的源节点
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const payload = (sourceNode as any)?.payload;
    if (payload) {
      if (payload.edgeClassname) {
        edge.className = payload.edgeClassname;
      }
      if (payload.edgeStyle) {
        edge.style = payload.edgeStyle;
      }
      if (payload.edgeLabel) {
        edge.label = payload.edgeLabel;
      }
    }

    return edge;
  });

  const onRestore = () => {};

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      // localStorage.setItem(reactFlowInstance, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  return (
    <ReactFlowProvider>
      <div className="Flow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edgesWithUpdatedTypes}
          onEdgesChange={onEdgesChange}
          // onNodeClick={console.log}
          // edgeTypes={edgeTypes}
          // connectionLineComponent={ConnectionEdge}
          onConnect={(params: Connection | Edge) => {
            return onConnect({ ...params });
          }}
          fitView
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={(instance: any) => setReactFlowInstance(instance)}
          snapToGrid={true}
          onNodeContextMenu={(e: any, node: Node) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onPaneContextMenu={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onEdgeContextMenu={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          selectionOnDrag={true}
          // selectionKeyCode="ctrl"
        >
          <Panel position="top-left">
            <PanelComponent />
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

          <div className="save_controls">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
          </div>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
