import { memo } from "react";

interface props {
  layer: LayerItemType;
  onPointerDown: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

const RectangleLayer = memo(({ layer, onPointerDown }: props) => {
  return (
    <rect
      className={"drop-shadow-md"}
      x={layer.layerData.point.x}
      y={layer.layerData.point.y}
      fill="white"
      rx={20}
      ry={20}
      width={layer.layerData.width}
      height={layer.layerData.height}
      onPointerDown={onPointerDown}
    />
  );
});

export default RectangleLayer;
