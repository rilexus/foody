"use client";
import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.$disabled ? "#9da3a6" : "#2c2e2f")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;

const ToggleTrack = styled.button`
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  background-color: ${(props) => {
    if (props.$disabled) return "#cbd2d6";
    if (props.$error) return "#d20000";
    return props.$checked ? "#0070ba" : "#cbd2d6";
  }};
  transition: background-color 0.3s ease;
  outline: none;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 112, 186, 0.3);
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => {
      if (props.$error) return "#b30000";
      return props.$checked ? "#005ea6" : "#b7bfc6";
    }};
  }
`;

const ToggleThumb = styled.span`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.$checked ? "26px" : "2px")};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  transition: left 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const HelperText = styled.span`
  font-size: 13px;
  color: ${(props) => (props.$error ? "#d20000" : "#687173")};
  line-height: 1.4;
`;

export function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  helperText,
  error,
}) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <ToggleContainer>
      <ToggleWrapper>
        <ToggleTrack
          type="button"
          role="switch"
          aria-checked={checked}
          $checked={checked}
          $disabled={disabled}
          $error={!!error}
          onClick={handleToggle}
          disabled={disabled}
        >
          <ToggleThumb $checked={checked} />
        </ToggleTrack>
        {label && (
          <Label $disabled={disabled} onClick={handleToggle}>
            {label}
          </Label>
        )}
      </ToggleWrapper>
      {(helperText || error) && (
        <HelperText $error={!!error}>{error || helperText}</HelperText>
      )}
    </ToggleContainer>
  );
}
