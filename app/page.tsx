"use client";
import { useLayerData } from "@/lib/hooks/useLayerData";
import CanvasVector from "./_components/layers/canvas";
import NavbarHeader from "./_components/sections/navbar";
import SidebarSection from "./_components/sections/sidebar";
import LayerPreviewSidebar from "./_components/sections/layerPreviewSidebar";

export default function Home() {
  const { selection } = useLayerData();
  return (
    <>
      <NavbarHeader />
      <CanvasVector />
      <LayerPreviewSidebar />
      {selection && <SidebarSection />}
    </>
  );
}
