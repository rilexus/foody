import React from "react";

export const Flex = ({
  direction = "row",
  children,
  gap = "0px",
  justifyContent = "start",
}) => {
  return (
    <div style={{ gap, direction, display: "flex", justifyContent }}>
      {children}
    </div>
  );
};
