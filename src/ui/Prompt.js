"use client";
import React from "react";
import { createContext, useContext, useState } from "react";
import styled from "styled-components";

// interface DialogOptions {
//   title: string;
//   message?: string;
//   defaultValue?: string;
//   onConfirm: (value: string) => void;
//   onCancel?: () => void;
// }

const DialogContext = createContext(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const DialogBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DialogTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const DialogMessage = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

const DialogInput = styled.input`
  width: calc(100% - 24px);
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  transition: all 0.2s;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const DialogActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const DialogButton = styled.button`
  background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)"
      : "#f3f4f6"};
  color: ${(props) => (props.$primary ? "white" : "#6b7280")};
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) =>
    props.$primary ? "0 2px 6px rgba(2, 132, 199, 0.2)" : "none"};

  &:hover {
    background: ${(props) =>
      props.$primary
        ? "linear-gradient(135deg, #0369a1 0%, #075985 100%)"
        : "#e5e7eb"};
    transform: translateY(-1px);
  }
`;

export default function Prompt({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const showDialog = (opts) => {
    setOptions(opts);
    setInputValue(opts.defaultValue || "");
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
    setOptions(null);
    setInputValue("");
  };

  const handleConfirm = () => {
    if (options?.onConfirm) {
      options.onConfirm(inputValue);
    }
    hideDialog();
  };

  const handleCancel = () => {
    if (options?.onCancel) {
      options.onCancel();
    }
    hideDialog();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleConfirm();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      {isOpen && options && (
        <Overlay onClick={handleCancel}>
          <DialogBox onClick={(e) => e.stopPropagation()}>
            <DialogTitle>{options.title}</DialogTitle>
            {options.message && (
              <DialogMessage>{options.message}</DialogMessage>
            )}
            <DialogInput
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter value..."
              autoFocus
            />
            <DialogActions>
              <DialogButton onClick={handleCancel}>Cancel</DialogButton>
              <DialogButton $primary onClick={handleConfirm}>
                Confirm
              </DialogButton>
            </DialogActions>
          </DialogBox>
        </Overlay>
      )}
    </DialogContext.Provider>
  );
}
