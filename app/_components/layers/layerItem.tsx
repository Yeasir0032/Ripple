import { useActiveTool } from "@/lib/hooks/useActiveTool";
import EllipseLayer from "./Ellipse";
import RectangleLayer from "./Rectangle";
import { useLayerData } from "@/lib/hooks/useLayerData";
import TextLayer from "./text";
import PathLayer from "./path";
import { getRealCursorLocationFromCamera } from "@/lib/utility";
import { useCameraLocation } from "@/lib/hooks/useCameraLocation";

interface props {
  layer: LayerItemType;
}

const LayerItem = ({ layer }: props) => {
  const { tool, setCanvasMode } = useActiveTool();
  const { setSelection } = useLayerData();
  const { cameraLocation } = useCameraLocation();
  function handleLayerOnPointerDown(e: React.PointerEvent) {
    if (tool !== "Move") return;
    const cursorLocation = getRealCursorLocationFromCamera(
      { x: e.clientX, y: e.clientY },
      cameraLocation
    );
    const newCursorDifference = {
      x: cursorLocation.x - layer.layerData.point.x,
      y: cursorLocation.y - layer.layerData.point.y,
    };
    setCanvasMode("Moving", undefined, newCursorDifference);
    setSelection(layer);
  }
  switch (layer.layerType) {
    case "Rectangle":
      return (
        <RectangleLayer
          layer={layer}
          onPointerDown={handleLayerOnPointerDown}
        />
      );
    case "Ellipse":
      return (
        <EllipseLayer layer={layer} onPointerDown={handleLayerOnPointerDown} />
      );
    case "Text":
      return (
        <TextLayer layer={layer} onPointerDown={handleLayerOnPointerDown} />
      );
    case "Draw":
      return (
        <PathLayer layer={layer} onPointerDown={handleLayerOnPointerDown} />
      );
    default:
      return <div>Unknown Layer Type</div>;
  }
};

export default LayerItem;
