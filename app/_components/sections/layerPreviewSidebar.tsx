import { useLayerData } from "@/lib/hooks/useLayerData";
import LayerPreviewItem from "./LayerPreviewItem";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

const LayerPreviewSidebar = () => {
  const { layers, reorderLayers } = useLayerData();
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    const { index: destinationIndex } = destination;
    const { index: sourceIndex } = source;
    reorderLayers(source.index, destination.index);
  };
  return (
    <div className="h-screen fixed top-12 border-l border-zinc-600/70 w-72 left-0 bg-[#2f2f35] text-zinc-300 text-sm">
      <div className="text-lg font-light p-2">Layers</div>
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
      <div className="p-2 w-full">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="1" type="card" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {layers.map((item) => (
                  <LayerPreviewItem
                    layertype={item.layerType}
                    id={item.id}
                    key={item.id}
                  />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default LayerPreviewSidebar;
