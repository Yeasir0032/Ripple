import React, { memo } from "react";

interface props {
  layer: LayerItemType;
  onPointerDown: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

const EllipseLayer = memo(({ layer, onPointerDown }: props) => {
  return (
    <ellipse
      className="drop-shadow-md"
      style={{
        transform: `translate(${layer.layerData.point.x}px,${layer.layerData.point.y}px)`,
      }}
      cx={layer.layerData.width / 2}
      rx={layer.layerData.width / 2}
      ry={layer.layerData.height / 2}
      cy={layer.layerData.height / 2}
      fill={layer.layerData.fill}
      onPointerDown={onPointerDown}
    />
  );
});

export default EllipseLayer;
