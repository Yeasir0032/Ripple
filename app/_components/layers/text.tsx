import { useLayerData } from "@/lib/hooks/useLayerData";
import React from "react";
import ContentEditable from "react-contenteditable";
interface props {
  layer: LayerItemType;
  onPointerDown: (e: any) => void;
  selectionColor?: string;
}
const TextLayer = ({ layer, onPointerDown }: props) => {
  const { editTextLayerData } = useLayerData();
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
      onClick={(e) => onPointerDown(e)}
    >
      <ContentEditable
        html={layer.textData ? layer.textData.data : "Text"}
        className="h-full w-full text-white bg-transparent flex items-center justify-center text-center drop-shadow-md outline-none"
        onChange={(e) => {
          editTextLayerData(e.target.value, layer.id);
        }}
      />
    </foreignObject>
  );
};

export default TextLayer;
