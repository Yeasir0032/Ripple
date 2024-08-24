import { useLayerData } from "@/lib/hooks/useLayerData";
import { Draggable } from "@hello-pangea/dnd";
import {
  Circle,
  LineChart,
  PenLine,
  PenTool,
  Square,
  TypeIcon,
} from "lucide-react";
import React from "react";

interface props {
  layertype: LayerType;
  id: number;
}
const iconClass = "p-1 text-zinc-400";
const LayerPreviewItem = ({ layertype, id }: props) => {
  const { selection, setSelection } = useLayerData();
  const getDataFromLayerType = (layertype: LayerType) => {
    const result: { type: string; icon: React.ReactNode } = {
      type: "",
      icon: <Square />,
    };
    switch (layertype) {
      case "Rectangle":
        result.icon = <Square className={iconClass} />;
        result.type = "Rectangle";
        break;
      case "Ellipse":
        result.icon = <Circle className={iconClass} />;
        result.type = "Ellipse";
        break;
      case "Text":
        result.icon = <TypeIcon className={iconClass} />;
        result.type = "Text";
        break;
      case "Line":
        result.icon = <LineChart className={iconClass} />;
        result.type = "Line";
        break;
      case "Draw":
        result.icon = <PenLine className={iconClass} />;
        result.type = "Path";
        break;
    }
    return result;
  };
  const layerData = getDataFromLayerType(layertype);
  return (
    <Draggable draggableId={id.toString()} index={id}>
      {(provided) => {
        return (
          <div
            className={`flex items-center gap-2 text-white text-md rounded-md cursor-move py-3 ${
              selection?.id === id && "bg-primary"
            }`}
            onClick={() => {
              setSelection(undefined, id);
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {layerData.icon}
            {layerData.type}
          </div>
        );
      }}
    </Draggable>
  );
};

export default LayerPreviewItem;
