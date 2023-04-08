import { ContextMenu, MenuItem } from "react-contextmenu";

const CustomNodeContextMenu = ({ id, onRemove }: any) => {
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    // @ts-ignore
    <ContextMenu id={`node-${id}`}>
      {/* @ts-ignore */}
      <MenuItem onClick={handleRemove}>删除</MenuItem>
    </ContextMenu>
  );
};

export default CustomNodeContextMenu;
