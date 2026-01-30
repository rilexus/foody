import React, { useState } from "react";
import styled from "styled-components";

const DynamicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DynamicItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  anchor-name: --dynamicInput;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  color: #1f2937;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const DynamicInput = styled(Input)`
  flex: 1;
  margin-bottom: 0;
  width: 100%;
`;

const DropdownMenu = styled.div`
  position: fixed;

  margin-top: 4px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 240px;
  overflow-y: auto;
  position-anchor: --dynamicInput;
  position-area: bottom left;
  position-try-fallbacks:
    top left,
    bottom right,
    top right;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f0f9ff;
  }
`;

const DropdownIcon = styled.span`
  font-size: 20px;
`;

const DropdownText = styled.div`
  flex: 1;
`;

const DropdownName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

const DropdownServing = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;
const DynamicInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const Select = ({ options, value = "", onChange }) => {
  const getFilteredOptions = (options, query) => {
    if (!query.trim()) return options;
    return options.filter((ing) =>
      ing.label.toLowerCase().includes(query.toLowerCase()),
    );
  };
  const filteredOptions = getFilteredOptions(options, value);
  const [showDropdown, setShowDropdown] = useState(null);
  return (
    <DynamicList>
      <DynamicItem>
        <DynamicInputWrapper>
          <DynamicInput
            type="text"
            value={value}
            onChange={(e) => {
              onChange({ label: e.target.value, value: e.target.value });
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              // Delay to allow click on dropdown item
              setTimeout(() => setShowDropdown(false), 200);
            }}
            placeholder={`Search ingredients or type manually...`}
          />
          {showDropdown && (
            <DropdownMenu>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => (
                  <DropdownItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setShowDropdown(false);
                      onChange(item);
                    }}
                  >
                    <DropdownText>
                      <DropdownName>{item.label}</DropdownName>
                    </DropdownText>
                  </DropdownItem>
                ))
              ) : (
                <NoResults>
                  No ingredients found. Type manually to add custom ingredient.
                </NoResults>
              )}
            </DropdownMenu>
          )}
        </DynamicInputWrapper>
      </DynamicItem>
    </DynamicList>
  );
};
