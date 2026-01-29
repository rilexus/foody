import React from "react";

export const Flex = ({
  direction = "row",
  children,
  justifyContent = "start",
}) => {
  return (
    <div style={{ direction, display: "flex", justifyContent }}>{children}</div>
  );
};
