import { create } from "zustand";

interface LayerData {
  layers: LayerItemType[];
  selection?: LayerItemType;
  insertLayer: (
    layerType: LayerType,
    point: Point,
    pathLayerData?: { points: number[][]; width: number; height: number }
  ) => LayerItemType;
  setSelection: (layerItem?: LayerItemType) => void;
  resizeLayer: (layerId: number, bounds: XYWH) => void;
  editTextLayerData: (textData: string, id: number) => void;
  moveLayer: (layerId: number, x: number, y: number) => void;
}
export const useLayerData = create<LayerData>((set, get) => ({
  layers: [],
  selection: undefined,
  insertLayer: (layerType, point, pathLayerData) => {
    const { layers } = get();
    const newLayer: LayerItemType = {
      id: layers.length,
      layerType: layerType,
      layerData: {
        borderRadius: 50,
        point: point,
        width: 10,
        height: 10,
      },
    };
    if (layerType == "Text") {
      newLayer.textData = {
        data: "Text",
        fontSize: 20,
      };
    }
    if (layerType == "Draw" && pathLayerData) {
      newLayer.pathData = {
        points: pathLayerData.points,
      };
      newLayer.layerData.width = pathLayerData.width;
      newLayer.layerData.height = pathLayerData.height;
    }
    set((state) => {
      return { layers: [...state.layers, newLayer], selection: undefined };
    });
    return newLayer;
  },
  setSelection: (layerItem) => set({ selection: layerItem }),
  resizeLayer: (layerId, bounds) =>
    set((state) => {
      const layers = state.layers;
      layers[layerId].layerData = {
        point: {
          x: bounds.x,
          y: bounds.y,
        },
        width: bounds.width,
        borderRadius: 10,
        height: bounds.height,
      };
      return {
        layers: layers,
      };
    }),
  editTextLayerData: (textData, id) =>
    set((state) => {
      const layers = state.layers;
      const layerData = layers[id].textData;
      if (layerData) {
        layerData.data = textData;
      }
      layers[id].textData = layerData;
      return { layers: layers };
    }),
  moveLayer: (layerId, x, y) =>
    set((state) => {
      const layers = state.layers;
      layers[layerId].layerData.point = {
        x: x,
        y: y,
      };
      return {
        layers: layers,
      };
    }),
}));
