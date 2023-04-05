import React from "react";
import { NodeTypes } from "reactflow";

export default function LeftPanel() {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="dndnode input"
      onDragStart={(event) => onDragStart(event, "input")}
      draggable
    >
      Input Node
    </div>
  );
}
