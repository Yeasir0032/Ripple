import { getSvgPathFromStroke } from "@/lib/utility";
import getStroke from "perfect-freehand";

interface props {
  layer: LayerItemType;
  onPointerDown: (e: React.PointerEvent) => void;
  selectionColor?: string;
}

const PathLayer = ({ layer, onPointerDown }: props) => {
  const pathData = layer.pathData;
  if (!pathData) return <div>Errora</div>;
  // console.log(layer.layerData.width);
  return (
    <path
      className="drop-shadow-md"
      d={getSvgPathFromStroke(
        getStroke(pathData.points, {
          size: 4,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
          simulatePressure: false,
        })
      )}
      style={{
        transform: `translate(${layer.layerData.point.x}px,${layer.layerData.point.y}px)`,
      }}
      x={0}
      y={0}
      fill="white"
      stroke="1"
      onPointerDown={onPointerDown}
    />
  );
};

export default PathLayer;
