import React from "react";
import DataInputSidebar from "./data-input-sidebar";
import { LucideCornerUpRight, RotateCw } from "lucide-react";
import { useLayerData } from "@/lib/hooks/useLayerData";

const SidebarSection = () => {
  const { selection, setAttributes } = useLayerData();
  if (!selection) return <div></div>;
  return (
    <div className="h-screen fixed top-12 border-l border-zinc-600/70 w-72 right-0 bg-[#2f2f35] text-zinc-300 text-sm">
      <div className="flex p-4 py-2 gap-3">
        <span className="text-white">Design</span>
        <span>Prototype</span>
      </div>
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
      <div className="p-4 py-2">Rectangle</div>
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
      <div className="flex justify-between p-4 py-2">
        <DataInputSidebar
          value={selection.layerData.point.x}
          field="X"
          onChange={(e) =>
            setAttributes("x", selection.id, Number.parseInt(e.target.value))
          }
        />
        <DataInputSidebar
          value={selection.layerData.point.y}
          field="Y"
          onChange={(e) =>
            setAttributes("y", selection.id, Number.parseInt(e.target.value))
          }
        />
      </div>
      <div className="flex justify-between p-4 py-2">
        <DataInputSidebar
          value={selection.layerData.width}
          field="W"
          onChange={(e) =>
            setAttributes("w", selection.id, Number.parseInt(e.target.value))
          }
        />
        <DataInputSidebar
          value={selection.layerData.height}
          field="H"
          onChange={(e) =>
            setAttributes("h", selection.id, Number.parseInt(e.target.value))
          }
        />
      </div>
      {selection.layerType == "Rectangle" && (
        <div className="flex justify-between p-4 py-2">
          {/* <DataInputSidebar value={0} field={<RotateCw className="w-4 h-4" />} /> */}
          <DataInputSidebar
            value={selection.layerData.borderRadius}
            field={<LucideCornerUpRight className="w-4 h-4" />}
            onChange={(e) => {
              if (e.target.value >= 0)
                setAttributes("br", selection.id, e.target.value);
            }}
          />
        </div>
      )}
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
      <div className="p-4 font-medium font-sans">Layer</div>
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
      {selection.layerType === "Text" && (
        <>
          <div className="p-4 py-2 text-lg">Text</div>
          <div className="p-4 py-2 font-medium font-sans flex justify-between items-center">
            <DataInputSidebar field="Size" onChange={() => {}} value={24} />
          </div>
          <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
        </>
      )}
      <div className="p-4 py-2 font-medium font-sans flex justify-between items-center">
        <div>Fill</div>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            className="w-6 h-6"
            value={selection.layerData.fill.slice(0, 7)}
            onChange={(e) => {
              const getOpacity = selection.layerData.fill.slice(7, 10);
              const finalColour = `${e.target.value}${getOpacity}`;
              setAttributes("color", selection.id, undefined, finalColour);
            }}
          />
          <span>{selection.layerData.fill}</span>
        </div>
      </div>

      <div className="p-4 py-2 font-medium font-sans flex justify-between items-center">
        <div>Opacity</div>
        <div className="flex gap-2 items-center">
          <input
            type="range"
            max={255}
            value={Number.parseInt(selection.layerData.fill.slice(7, 9), 16)}
            onChange={(e) => {
              const hex = Number.parseInt(e.target.value)
                .toString(16)
                .padStart(2, "0");
              // console.log(hex);
              const getColor = selection.layerData.fill.slice(0, 7);
              const finalColour = `${getColor}${hex}`;
              setAttributes("color", selection.id, undefined, finalColour);
            }}
          />
          <span>
            {Math.round(
              Number.parseInt(selection.layerData.fill.slice(7, 9), 16) / 2.55
            )}
            %
          </span>
        </div>
      </div>
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />

      <div className="p-4 py-2 font-medium font-sans flex justify-between items-center">
        <div>Stroke</div>
        <div className="flex gap-2 items-center">
          <input type="checkbox" />
        </div>
      </div>
      {true && (
        <div className="p-4 py-2">
          <div className="flex gap-2 items-center">
            <input type="color" className="w-6 h-6" />
            <span>#ffff</span>
          </div>
          <div>{/* MenuItems */}</div>
        </div>
      )}
      <div className="bg-zinc-600/75 w-full h-[1px] my-1" />
    </div>
  );
};

export default SidebarSection;
