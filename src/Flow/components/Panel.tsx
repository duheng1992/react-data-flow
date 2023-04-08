import React from "react";

export default function Panel() {
  const onDragStart = (event: any, nodeType: string, payload?: any) => {
    event.dataTransfer.setData("application/reactflow/nodeType", nodeType);
    if (payload) {
      event.dataTransfer.setData(
        "application/reactflow/payload",
        JSON.stringify(payload)
      );
    }
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="Flow-panel">
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        输入节点
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        中间节点
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        输出节点
      </div>
      <div
        className="dndnode input1"
        onDragStart={(event) =>
          onDragStart(event, "input", {
            edgeClassname: "animated",
            edgeStyle: { stroke: "#04d314" },
            edgeLabel: "我是自定义连接线",
          })
        }
        draggable
      >
        自定义输出连接线
      </div>
      <div
        className="dndnode custom1"
        onDragStart={(event) => onDragStart(event, "custom1")}
        draggable
      >
        自定义节点（1-2）
      </div>
    </div>
  );
}
