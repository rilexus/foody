"use client";
import React from "react";
import styled from "styled-components";
import { forwardRef } from "react";

const StyledInputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$hasError ? "#d20000" : "#2c2e2f")};
  margin-bottom: 8px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  font-size: 15px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
  color: #2c2e2f;
  background-color: #ffffff;
  border: 1px solid ${(props) => (props.$hasError ? "#d20000" : "#cbd2d6")};
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.$hasError ? "#d20000" : "#0070ba")};
  }

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#d20000" : "#0070ba")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$hasError ? "rgba(210, 0, 0, 0.1)" : "rgba(0, 112, 186, 0.1)"};
  }

  &:disabled {
    background-color: #f5f7fa;
    color: #9da3a6;
    cursor: not-allowed;
    border-color: #cbd2d6;
  }

  &::placeholder {
    color: #9da3a6;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: 13px;
  color: #d20000;
  margin-top: 6px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
`;

const HelperText = styled.span`
  display: block;
  font-size: 13px;
  color: #6c7378;
  margin-top: 6px;
  font-family: "PayPalSansSmall-Regular", Helvetica, Arial, sans-serif;
`;

export const Input = forwardRef(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <StyledInputWrapper>
        {label && <StyledLabel $hasError={!!error}>{label}</StyledLabel>}
        <StyledInput
          ref={ref}
          $hasError={!!error}
          aria-invalid={!!error}
          {...props}
        />
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        {!error && helperText && <HelperText>{helperText}</HelperText>}
      </StyledInputWrapper>
    );
  },
);

Input.displayName = "PayPalInput";
