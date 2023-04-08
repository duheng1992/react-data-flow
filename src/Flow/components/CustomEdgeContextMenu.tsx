import { ContextMenu, MenuItem } from "react-contextmenu";

const CustomEdgeContextMenu = ({ id, onRemove }: any) => {
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    // @ts-ignore
    <ContextMenu id={`edge-${id}`}>
      {/* @ts-ignore */}
      <MenuItem onClick={handleRemove}>删除</MenuItem>
    </ContextMenu>
  );
};

export default CustomEdgeContextMenu;
