import React from "react";

interface props {
  children: React.ReactNode;
}

const FrameLayerGroup = ({ children }: props) => {
  return <svg>{children}</svg>;
};

export default FrameLayerGroup;
