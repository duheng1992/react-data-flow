import React from "react";
import { useStoreApi, useReactFlow, ControlButton } from "reactflow";

const initZoom = 1.2;

export default function Toolbar() {
  const store = useStoreApi();
  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];

      if (
        node &&
        node.width !== null &&
        node.width !== undefined &&
        node.height !== null &&
        node.height !== undefined
      ) {
        const x = node.position.x + node.width / 2;
        const y = node.position.y + node.height / 2;
        const zoom = initZoom;

        setCenter(x, y, { zoom, duration: 1000 });
      }
    }
  };

  return (
    <>
      <ControlButton onClick={() => zoomIn()}>+</ControlButton>
      <ControlButton onClick={() => zoomOut()}>-</ControlButton>
      <ControlButton onClick={focusNode}>fit</ControlButton>
    </>
  );
}
