"use client";

import React from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$disabled ? "#9da3a6" : "#2c2e2f")};
  line-height: 1.5;

  ${(props) =>
    props.$required &&
    `
    &::after {
      content: "*";
      color: #d20000;
      margin-left: 4px;
    }
  `}
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 36px 0 12px;
  border: 1px solid ${(props) => (props.$error ? "#d20000" : "#cbd2d6")};
  border-radius: 4px;
  background-color: #ffffff;
  color: #2c2e2f;
  font-size: 14px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%232c2e2f' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.$error ? "#d20000" : "#0070ba")};
  }

  &:focus {
    border-color: ${(props) => (props.$error ? "#d20000" : "#0070ba")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$error ? "rgba(210, 0, 0, 0.1)" : "rgba(0, 112, 186, 0.1)"};
  }

  &:disabled {
    background-color: #f5f7fa;
    color: #9da3a6;
    cursor: not-allowed;
    border-color: #eaeced;
  }

  option {
    padding: 10px;
    background-color: #ffffff;
    color: #2c2e2f;
  }

  /* Placeholder styling */
  &:invalid {
    color: #9da3a6;
  }
`;

const HelperText = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$error ? "#d20000" : "#6c7378")};
  line-height: 1.4;
`;

export function Select({
  label,
  options,
  value,
  name,
  onChange,
  placeholder = "Select an option",
  error,
  helperText,
  disabled = false,
  required = false,
}) {
  const handleChange = (e) => {
    onChange?.(e);
  };

  return (
    <SelectContainer>
      {label && (
        <Label $disabled={disabled} $required={required}>
          {label}
        </Label>
      )}
      <StyledSelect
        name={name}
        value={value || ""}
        onChange={handleChange}
        $error={!!error}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {(error || helperText) && (
        <HelperText $error={!!error}>{error || helperText}</HelperText>
      )}
    </SelectContainer>
  );
}
