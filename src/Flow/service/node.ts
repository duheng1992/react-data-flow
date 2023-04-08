import ReactFlow, { type Connection, type Edge, type Node } from "reactflow";
import CustomNode from "../components/CustomNode";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  custom1: CustomNode,
};

const initialNodes: Node[] = [
  // 通过API获取
];

const initialEdges: Edge[] = [
  // 通过API获取
];

const getNewNode = (type: any, position: any, payload: any) => {
  return {
    id: getId(),
    type,
    position,
    data: { label: `${type} node` },
    payload,
  };
};

export { nodeTypes, initialNodes, initialEdges, getNewNode };
