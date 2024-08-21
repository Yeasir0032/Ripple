type LayerItemType = {
  id: number;
  layerType: LayerType;
  layerData: {
    point: Point;
    borderRadius: number;
    height: number;
    width: number;
    fill?: Color;
  };
  textData?: {
    data: string;
    fontSize?: number;
  };
  pathData?: {
    points: number[][];
  };
};
type LayerType = "Rectangle" | "Ellipse" | "Text" | "Line" | "Pen" | "Draw";
// enum LayerTypes {
//   Rectangle,
//   Ellipse,
//   Draw,
//   Text,
// }
type Color = {
  r: number;
  g: number;
  b: number;
};
type Point = {
  x: number;
  y: number;
};
type XYWH = {
  x: number;
  y: number;
  height: number;
  width: number;
};
type ResizeThumb = "TopRight" | "TopLeft" | "BottomRight" | "BottomLeft";
// type ShapeTypes =
//   | "Rectangle"
//   | "Line"
//   | "Ellipse"
//   | "Arrow"
//   | "Polygon"
//   | "Star"
//   | "Image";
type CursorActionTypes = "Move" | "Shape" | "Draw" | "Text" | "Panel";
type CanvasMode = "Inserting" | "Moving" | "Resizing" | "Drawing" | "None";
