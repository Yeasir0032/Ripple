import { create } from "zustand";

interface cameraLocation {
  cameraLocation: Point;
  setCameraLocation: (value: Point) => void;
}

export const useCameraLocation = create<cameraLocation>((set) => ({
  cameraLocation: { x: 0, y: 0 },
  setCameraLocation: (value) =>
    set((state) => {
      const newLocation = {
        x: state.cameraLocation.x - value.x,
        y: state.cameraLocation.y - value.y,
      };
      return {
        cameraLocation: newLocation,
      };
    }),
}));
