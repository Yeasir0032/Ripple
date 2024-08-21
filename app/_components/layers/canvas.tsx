"use client";

import React, { MouseEvent, WheelEvent } from "react";
import LayerItem from "./layerItem";
import { useActiveTool } from "@/lib/hooks/useActiveTool";
import { useLayerData } from "@/lib/hooks/useLayerData";
import SelectionBox from "./selection-box";
import { useCameraLocation } from "@/lib/hooks/useCameraLocation";
import {
  getRealCursorLocationFromCamera,
  penPointsToPathLayer,
  resizeBounds,
} from "@/lib/utility";
import DrawingPreview from "./DrawingPreview";

const CanvasVector = () => {
  const { cameraLocation, setCameraLocation } = useCameraLocation();
  const {
    tool,
    mainTool,
    canvasMode,
    resizeThumb,
    setCanvasMode,
    setTool,
    moveStartMouseLocation,
  } = useActiveTool();
  const { layers, insertLayer, resizeLayer, selection, moveLayer } =
    useLayerData();
  const [pencilDraft, setPencilDraft] = React.useState<number[][] | null>(null);

  function startDrawing(point: Point) {
    setPencilDraft([[point.x, point.y]]);
    setCanvasMode("Drawing");
  }
  function continueDrawing(point: Point, e: any) {
    if (canvasMode !== "Drawing" || e.buttons !== 1 || pencilDraft == null) {
      return;
    }
    const newPencilDraft =
      pencilDraft.length === 1 &&
      pencilDraft[0][0] === point.x &&
      pencilDraft[0][1] === point.y
        ? pencilDraft
        : [...pencilDraft, [point.x, point.y]];
    setPencilDraft(newPencilDraft);
  }
  function insertPath() {
    if (pencilDraft == null || pencilDraft.length < 2) {
      return;
    }
    const data = penPointsToPathLayer(pencilDraft);
    insertLayer(
      "Draw",
      { x: data.x, y: data.y },
      { points: data.points, width: data.width, height: data.height }
    );
    setPencilDraft(null);
  }

  function resizeLayerOnMouseMove(e: MouseEvent) {
    if (selection && resizeThumb.type) {
      const newBounds: XYWH = {
        x: selection.layerData.point.x,
        y: selection.layerData.point.y,
        width: selection.layerData.width,
        height: selection.layerData.height,
      };
      const currentMouseLocation = getRealCursorLocationFromCamera(
        {
          x: e.clientX,
          y: e.clientY,
        },
        cameraLocation
      );
      const finalBounds = resizeBounds(
        newBounds,
        resizeThumb.type,
        currentMouseLocation
      );
      resizeLayer(selection.id, finalBounds);
    }
  }

  function moveLayerOnMouseMove(e: MouseEvent) {
    if (!selection) return;
    const currentMouseLocation = getRealCursorLocationFromCamera(
      {
        x: e.clientX,
        y: e.clientY,
      },
      cameraLocation
    );
    if (moveStartMouseLocation) {
      const newPoint = {
        x: currentMouseLocation.x - moveStartMouseLocation.x,
        y: currentMouseLocation.y - moveStartMouseLocation.y,
      };
      moveLayer(selection.id, newPoint.x, newPoint.y);
    }
  }

  function onMouseDown(e: MouseEvent) {
    const currentMouseLocation = getRealCursorLocationFromCamera(
      {
        x: e.clientX,
        y: e.clientY,
      },
      cameraLocation
    );
    if (tool === "Draw" && mainTool == "Draw") {
      startDrawing(currentMouseLocation);
    }
  }

  function onMouseMove(e: MouseEvent) {
    // e.stopPropagation();
    if (canvasMode === "Resizing") {
      resizeLayerOnMouseMove(e);
    } else if (canvasMode === "Moving") {
      moveLayerOnMouseMove(e);
    } else if (canvasMode === "Drawing") {
      const currentMouseLocation = getRealCursorLocationFromCamera(
        {
          x: e.clientX,
          y: e.clientY,
        },
        cameraLocation
      );
      continueDrawing(currentMouseLocation, e);
    }
  }

  function onMouseUp(e: MouseEvent) {
    switch (tool) {
      case "Shape":
        // insertLaayer(e);
        insertLayer(mainTool, {
          x: e.clientX - cameraLocation.x,
          y: e.clientY - cameraLocation.y,
        });
        break;
      case "Move":
        break;
      case "Draw":
        break;
      case "Text":
        insertLayer(tool, {
          x: e.clientX - cameraLocation.x,
          y: e.clientY - cameraLocation.y,
        });
        setTool("Move");
        break;
      case "Panel":
        break;
    }
    if (canvasMode === "Resizing") {
      setCanvasMode("None");
    } else if (canvasMode === "Drawing") {
      insertPath();
      setCanvasMode("None");
      setTool("Move");
    } else if (canvasMode === "Moving") {
      setCanvasMode("None");
    }
  }

  function onWheel(e: WheelEvent) {
    setCameraLocation({ x: e.deltaX, y: e.deltaY });
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-screen w-screen bg-zinc-900"
      onMouseUp={onMouseUp}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <g
        style={{
          transform: `translate(${cameraLocation.x}px,${cameraLocation.y}px)`,
        }}
      >
        {layers.map((layerId) => (
          <LayerItem key={layerId.id} layer={layerId} />
        ))}
        <SelectionBox />
        {/* Draw Real Time */}
        {pencilDraft && pencilDraft.length > 2 && (
          <DrawingPreview points={pencilDraft} />
        )}
      </g>
    </svg>
  );
};

export default CanvasVector;
