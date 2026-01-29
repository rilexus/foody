"use client";
import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { DangerButton } from "../../ui/Button";

const Container = styled.div`
  min-height: 100vh;
  // background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #e0e7ff 100%);
  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  background: white;
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  // border-radius: 24px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: #1f2937;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  color: #1f2937;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const IconPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #f9fafb;
`;

const IconOption = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${(props) => (props.$selected ? "#0284c7" : "white")};
  border: 2px solid ${(props) => (props.$selected ? "#0284c7" : "#e5e7eb")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
    border-color: #0284c7;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #6b7280;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #9ca3af;
    color: #374151;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #f9fafb;
`;

const ToggleLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

const Toggle = styled.button`
  width: 56px;
  height: 32px;
  background: ${(props) => (props.$active ? "#0284c7" : "#d1d5db")};
  border: none;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    top: 4px;
    left: ${(props) => (props.$active ? "28px" : "4px")};
    transition: all 0.2s;
  }
`;

const availableIcons = [
  "🍗",
  "🍚",
  "🥦",
  "🥚",
  "🥛",
  "🍞",
  "🥑",
  "🍅",
  "🥕",
  "🧀",
  "🥩",
  "🐟",
  "🍝",
  "🥔",
  "🌽",
  "🍄",
];

export default function EditIngredientPage({ onSave, onCancel, ingredient, onDelete }) {
  const [name, setName] = useState(ingredient?.name || "");
  const [icon, setIcon] = useState(ingredient?.icon || "");
  const [category, setCategory] = useState(ingredient?.category || "");
  const [calories, setCalories] = useState(ingredient?.calories || "");
  const [protein, setProtein] = useState(ingredient?.protein || "");
  const [carbs, setCarbs] = useState(ingredient?.carbs || "");
  const [fat, setFat] = useState(ingredient?.fat || "");
  const [servingSize, setServingSize] = useState(ingredient?.servingSize || "");
  const [storage, setStorage] = useState(ingredient?.storage || "");
  const [inStock, setInStock] = useState(ingredient?.inStock || false);

  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name);
      setIcon(ingredient.icon);
      setCategory(ingredient.category);
      setCalories(ingredient.calories.toString());
      setProtein(ingredient.protein.toString());
      setCarbs(ingredient.carbs.toString());
      setFat(ingredient.fat.toString());
      setServingSize(ingredient.servingSize);
      setStorage(ingredient.storage);
      setInStock(ingredient.inStock);
    }
  }, [ingredient]);

  const handleSave = () => {
    const updatedIngredient = {
      id: ingredient?.id || Date.now(),
      name,
      icon,
      category,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      servingSize,
      storage,
      inStock,
    };
    onSave(updatedIngredient);
  };

  const handleDelete = (ing) => {
    onDelete(ing)
  }

  return (
    <Container>
      <FormContainer>
        <Header>
          <BackButton onClick={() => onCancel()}>←</BackButton>
          <Title>Edit Ingredient</Title>
        </Header>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          <FormGrid>
            <FormField style={{ gridColumn: "1 / -1" }}>
              <Label>Ingredient Name</Label>
              <Input
                type="text"
                placeholder="Enter ingredient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>

            <FormField style={{ gridColumn: "1 / -1" }}>
              <Label>Icon</Label>
              <IconPicker>
                {availableIcons.map((iconOption) => (
                  <IconOption
                    key={iconOption}
                    type="button"
                    $selected={icon === iconOption}
                    onClick={() => setIcon(iconOption)}
                  >
                    {iconOption}
                  </IconOption>
                ))}
              </IconPicker>
            </FormField>

            <FormField>
              <Label>Category</Label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Protein">Protein</option>
                <option value="Grains">Grains</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Fats">Fats</option>
              </Select>
            </FormField>

            <FormField>
              <Label>Serving Size</Label>
              <Input
                type="text"
                placeholder="e.g., 100g"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
              />
            </FormField>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Nutritional Information (per serving)</SectionTitle>
          <FormGrid>
            <FormField>
              <Label>Calories (kcal)</Label>
              <Input
                type="number"
                placeholder="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </FormField>

            <FormField>
              <Label>Protein (g)</Label>
              <Input
                type="number"
                placeholder="0"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </FormField>

            <FormField>
              <Label>Carbohydrates (g)</Label>
              <Input
                type="number"
                placeholder="0"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </FormField>

            <FormField>
              <Label>Fat (g)</Label>
              <Input
                type="number"
                placeholder="0"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </FormField>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Storage & Availability</SectionTitle>
          <FormGrid>
            <FormField>
              <Label>Storage Method</Label>
              <Select
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              >
                <option value="Refrigerated">Refrigerated</option>
                <option value="Frozen">Frozen</option>
                <option value="Pantry">Pantry</option>
                <option value="Room Temperature">Room Temperature</option>
              </Select>
            </FormField>

            <FormField>
              <Label>Stock Status</Label>
              <ToggleContainer>
                <ToggleLabel>
                  {inStock ? "In Stock" : "Out of Stock"}
                </ToggleLabel>
                <Toggle
                  $active={inStock}
                  onClick={() => setInStock(!inStock)}
                  type="button"
                />
              </ToggleContainer>
            </FormField>
          </FormGrid>
        </FormSection>

        <ButtonGroup>
          {!!ingredient && (
            <DangerButton
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete your account? This action cannot be undone.",
                  )
                ) {
                  handleDelete(ingredient);
                }
              }}
            >
              Delete
            </DangerButton>
          )}

          <SecondaryButton onClick={() => onCancel()}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
}
