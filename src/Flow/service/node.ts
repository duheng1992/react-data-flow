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
import CustomNode from "../CustomNode";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    data: { label: "Node 4" },
    position: { x: 400, y: 200 },
    type: "custom",
    parentNode: "6",
  },
  {
    id: "5",
    data: { label: "Node 5" },
    position: { x: 450, y: 450 },
    parentNode: "6",
  },
  {
    id: "6",
    data: { label: "Node 6" },
    position: { x: 500, y: 500 },
    type: "group",
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e1-4", source: "2", target: "3", animated: true },
];

const getNewNode = (type: any, position: any) => {
  return {
    id: getId(),
    type,
    position,
    data: { label: `${type} node` },
  };
};

export { nodeTypes, initialNodes, initialEdges, getNewNode };
