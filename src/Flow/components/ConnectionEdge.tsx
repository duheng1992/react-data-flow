import React, { useMemo } from "react";
import { ConnectionLineComponentProps } from "reactflow";

export default ({
  fromX,
  fromY,
  fromPosition,
  fromNode,
  toX,
  toY,
  toPosition,
  connectionLineType,
  connectionLineStyle,
}: ConnectionLineComponentProps) => {
  // 拖拽时的线
  return (
    <g>
      <path
        fill="none"
        stroke={"#555"}
        strokeWidth={1.2}
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  );
};
