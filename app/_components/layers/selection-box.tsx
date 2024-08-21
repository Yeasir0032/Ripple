import { useActiveTool } from "@/lib/hooks/useActiveTool";
import { useLayerData } from "@/lib/hooks/useLayerData";
import React from "react";

const HANDLE_WIDTH = 8;
const SelectionBox = () => {
  const { selection } = useLayerData();
  const { setCanvasMode } = useActiveTool();
  if (!selection) return null;
  const isNotPathLayer = selection.layerType !== "Draw";
  const bounds = {
    x: selection.layerData.point.x,
    y: selection.layerData.point.y,
    width: selection.layerData.width,
    height: selection.layerData.height,
  };

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-2 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px,${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      <>
        {isNotPathLayer && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}`,
                height: `${HANDLE_WIDTH}`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,${
                  bounds.y - HANDLE_WIDTH / 2
                }px)`,
              }}
              onPointerDown={(e) => {
                // getRealCursorLocationFromCamera({x})
                setCanvasMode("Resizing", "TopLeft", {
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}`,
                height: `${HANDLE_WIDTH}`,
                transform: `translate(${
                  bounds.x + bounds.width - HANDLE_WIDTH / 2
                }px,${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                setCanvasMode("Resizing", "TopRight", {
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
            />

            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}`,
                height: `${HANDLE_WIDTH}`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,${
                  bounds.y + bounds.height - HANDLE_WIDTH / 2
                }px)`,
              }}
              onPointerDown={(e) => {
                // e.stopPropagation();
                setCanvasMode("Resizing", "BottomLeft", {
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
            />

            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}`,
                height: `${HANDLE_WIDTH}`,
                transform: `translate(${
                  bounds.x + bounds.width - HANDLE_WIDTH / 2
                }px,${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                setCanvasMode("Resizing", "BottomRight", {
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
            />
          </>
        )}
      </>
    </>
  );
};

export default SelectionBox;
