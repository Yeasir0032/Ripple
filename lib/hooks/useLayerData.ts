import { create } from "zustand";

interface LayerData {
  layers: LayerItemType[];
  selection?: LayerItemType;
  insertLayer: (
    layerType: LayerType,
    point: Point,
    pathLayerData?: { points: number[][]; width: number; height: number }
  ) => LayerItemType;
  setSelection: (layerItem?: LayerItemType, id?: number) => void;
  resizeLayer: (layerId: number, bounds: XYWH) => void;
  editTextLayerData: (textData: string, id: number) => void;
  moveLayer: (layerId: number, x: number, y: number) => void;
  setAttributes: (
    attr: "x" | "y" | "w" | "h" | "br" | "color" | "stroke",
    layerId: number,
    valueNum?: number,
    valueColor?: string
  ) => void;
  reorderLayers: (sourceIndex: number, destinationIndex: number) => void;
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
        width: layerType === "Text" ? 100 : 10,
        height: layerType === "Text" ? 30 : 10,
        fill: "#ffffffff",
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
  setSelection: (layerItem, layerId) =>
    set((state) => {
      if (layerId != undefined) {
        return { selection: state.layers[layerId] };
      }
      if (layerItem) {
        return { selection: layerItem };
      }
      return state;
    }),
  resizeLayer: (layerId, bounds) =>
    set((state) => {
      const layers = state.layers;
      layers[layerId].layerData = {
        ...layers[layerId].layerData,
        point: {
          x: bounds.x,
          y: bounds.y,
        },
        width: bounds.width,
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
  setAttributes: (attr, layerId, valueNum, valueColor) =>
    set((state) => {
      const layers = state.layers;
      const layer = layers[layerId];
      if (valueNum) {
        switch (attr) {
          case "x":
            layer.layerData.point.x = valueNum;
            break;
          case "y":
            layer.layerData.point.y = valueNum;
            break;
          case "w":
            layer.layerData.width = valueNum;
            break;
          case "h":
            layer.layerData.height = valueNum;
            break;
          case "br":
            layer.layerData.borderRadius = valueNum;
            break;
          case "stroke":
            break;
          default:
            break;
        }
      }
      if (valueColor && attr == "color") {
        layer.layerData.fill = valueColor;
      }
      return { layers: layers };
    }),
  reorderLayers: (sourceIndex, destinationIndex) =>
    set((state) => {
      const layers = state.layers;
      const [removed] = layers.splice(sourceIndex, 1);
      layers.splice(destinationIndex, 0, removed);
      //Setup id s too
      layers.forEach((layer, index) => {
        layer.id = index;
      });

      return { layers: layers };
    }),
}));
