import { useLayerData } from "@/lib/hooks/useLayerData";
import { cn } from "@/lib/utils";
import React from "react";
import ContentEditable from "react-contenteditable";
interface props {
  layer: LayerItemType;
  onPointerDown: (e: any) => void;
  selectionColor?: string;
}
const TextLayer = ({ layer, onPointerDown }: props) => {
  const { editTextLayerData } = useLayerData();
  const color = layer.layerData.fill.slice(1, 7);

  return (
    <foreignObject
      x={layer.layerData.point.x}
      y={layer.layerData.point.y}
      width={layer.layerData.width}
      height={layer.layerData.height}
      style={{
        outline: "none",
        fill: "none",
        overflow: "visible",
      }}
      onPointerDown={(e) => onPointerDown(e)}
    >
      <ContentEditable
        html={layer.textData ? layer.textData.data : "Text"}
        className={cn(
          `w-full bg-transparent text-white flex items-center justify-center text-center drop-shadow-md outline-none  `
        )}
        onChange={(e) => {
          editTextLayerData(e.target.value, layer.id);
        }}
      />
    </foreignObject>
  );
};

export default TextLayer;
