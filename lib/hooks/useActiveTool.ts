import { create } from "zustand";

interface ActiveTool {
  tool: CursorActionTypes;
  mainTool: LayerType;
  canvasMode: CanvasMode;
  resizeThumb: { type: ResizeThumb | "" };
  moveStartMouseLocation: Point | null;
  setTool: (value: CursorActionTypes, selectedTool?: LayerType) => void;
  setCanvasMode: (
    value: CanvasMode,
    thumb?: ResizeThumb,
    previosMouseLoc?: Point
  ) => void;
  setResizePoint: (value: Point) => void;
}
export const useActiveTool = create<ActiveTool>((set) => ({
  tool: "Shape",
  mainTool: "Rectangle",
  canvasMode: "Inserting",
  moveStartMouseLocation: null,
  resizeThumb: { type: "", initialPoint: { x: 0, y: 0 } },
  setCanvasMode: (value, thumb, previosMouseLoc) =>
    set((state) => {
      if (value === "Resizing") {
        if (thumb)
          return {
            resizeThumb: { type: thumb },
            canvasMode: value,
          };
      }
      if (value === "Moving" && previosMouseLoc) {
        return {
          canvasMode: value,
          moveStartMouseLocation: previosMouseLoc,
        };
      }
      return { canvasMode: value };
    }),
  setTool: (value, selectedTool) => {
    switch (value) {
      case "Shape":
        set({ tool: value, mainTool: selectedTool });
        return;
      case "Draw":
        set({ tool: value, mainTool: selectedTool });
        return;
      default:
        set({ tool: value });
        return;
    }
  },
  setResizePoint: (value) =>
    set((state) => {
      return { resizeThumb: { ...state.resizeThumb, initialPoint: value } };
    }),
}));
