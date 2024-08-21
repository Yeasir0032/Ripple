export function getRealCursorLocationFromCamera(
  location: Point,
  cameraLocation: Point
) {
  return {
    x: location.x - cameraLocation.x,
    y: location.y - cameraLocation.y,
  };
}
export function drawShapes(startPoint: Point, currentPoint: Point) {
  const bounds: XYWH = {
    x: Math.min(startPoint.x, currentPoint.x),
    y: Math.min(startPoint.y, currentPoint.y),
    width: Math.abs(currentPoint.x - startPoint.x),
    height: Math.abs(currentPoint.y - startPoint.y),
  };
  return bounds;
}
export function resizeBounds(
  bounds: XYWH,
  thumb: ResizeThumb,
  point: Point
): XYWH {
  const result = bounds;
  switch (thumb) {
    case "TopRight":
      result.height = Math.abs(bounds.y + bounds.height - point.y);
      result.y = Math.min(point.y, bounds.y + bounds.height);
      result.width = Math.abs(point.x - bounds.x);
      break;
    case "TopLeft":
      result.width = Math.abs(bounds.x + bounds.width - point.x);
      result.height = Math.abs(bounds.y + bounds.height - point.y);
      result.x = Math.min(point.x, bounds.width + bounds.x);
      result.y = Math.min(point.y, bounds.y + bounds.height);
      break;
    case "BottomRight":
      // console.log(bounds.width - bounds.x);
      // result.x = Math.min(point.x, Math.absbounds.width - bounds.x);
      result.height = Math.abs(point.y - bounds.y);
      result.width = Math.abs(point.x - bounds.x);
      break;
    case "BottomLeft":
      // console.log(bounds.x - point.x);
      result.width = Math.abs(bounds.x + bounds.width - point.x);
      result.x = point.x;
      result.height = Math.abs(point.y - bounds.y);
      break;
  }
  return result;
}

export function penPointsToPathLayer(points: number[][]) {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than two points");
  }
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }
  console.log(right, bottom, left, top);
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    points: points.map(([x, y]) => [x - left, y - top]),
  };
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z");
  return d.join(" ");
}
// export function getPointToMoveToNewLocation(previousPoint:Point,mouseLocation:Point) {
//   const result: Point = {x:0,y:0};
//   result.x = previousPoint.x - mouseLocation.x;
//   result.y = previousPoint.y - mouseLocation.y;
// }
