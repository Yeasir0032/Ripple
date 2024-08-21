"use client";
import Image from "next/image";
import React from "react";
import NavMenuItem from "./nav-menu-item";
import { Hash, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveTool } from "@/lib/hooks/useActiveTool";

const NavbarHeader = () => {
  const { tool, setTool } = useActiveTool();
  return (
    <div className="max-h-12 h-12 min-h-12 fixed bg-[#2f2f35] t-0 w-screen flex text-white">
      {/* Logo */}
      <Image
        src="/favicon.ico"
        alt="FavIcon"
        width={48}
        height={8}
        className="cover p-2 mr-2"
      />
      <span
        className={cn(
          "h-full px-4 flex items-center gap-1 cursor-pointer",
          tool === "Move" && "bg-teal-500"
        )}
        onClick={() => setTool("Move")}
      >
        <MousePointer2 className="h-full " />
      </span>
      <span
        className={cn(
          "h-full px-4 flex items-center gap-1 cursor-pointer",
          tool === "Panel" && "bg-teal-500"
        )}
        onClick={() => setTool("Panel")}
      >
        <Hash className="h-full " />
      </span>
      <NavMenuItem type="Shape" />
      <NavMenuItem type="Draw" />
      <span
        className={cn(
          "h-full px-4 flex items-center gap-1 cursor-pointer text-2xl font-serif",
          tool === "Text" && "bg-teal-500"
        )}
        onClick={() => setTool("Text")}
      >
        T
      </span>
    </div>
  );
};

export default NavbarHeader;
