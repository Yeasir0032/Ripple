import { getSvgPathFromStroke, penPointsToPathLayer } from "@/lib/utility";
import getStroke from "perfect-freehand";
import React from "react";

interface props {
  points: number[][];
}

const DrawingPreview = ({ points }: props) => {
  return (
    <path
      className="drop-shadow-md"
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 4,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
          simulatePressure: false,
        })
      )}
      x={0}
      y={0}
      fill="white"
      stroke="1"
    />
  );
};

export default DrawingPreview;
