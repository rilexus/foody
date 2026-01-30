import styled from "styled-components";
import React from "react";

export const TooltipWrapper = styled.div`
  position: relative;
  /* display: flex;
  flex: 1; */
`;

const Tip = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  ${TooltipWrapper}:hover & {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #1f2937;
  }
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

export const TooltipLabel = styled.span`
  color: #9ca3af;
  font-weight: 500;
`;

export const TooltipValue = styled.span`
  color: white;
  font-weight: 600;
`;

export const Tooltip = ({ children, element }) => {
  return (
    <TooltipWrapper>
      {children}
      <Tip>
        <TooltipContent>{element}</TooltipContent>
      </Tip>
    </TooltipWrapper>
  );
};
