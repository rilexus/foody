import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useIngredients } from "../../state/hooks/use-ingredients";
import { Select } from "../../ui/Select";
import { Flex } from "../../ui/Flex";

const FormSection = styled.div`
  background: white;
  // border-radius: 24px;
  padding: 32px;
  margin-bottom: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  color: #1f2937;
  transition: all 0.2s;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const IconSelector = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const IconOption = styled.button`
  width: 56px;
  height: 56px;
  background: ${(props) => (props.$selected ? "#e0f2fe" : "#f9fafb")};
  border: 2px solid ${(props) => (props.$selected ? "#0284c7" : "#e5e7eb")};
  border-radius: 12px;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    border-color: #0284c7;
  }
`;

const MacroInputsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const DynamicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DynamicItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const DynamicInput = styled(Input)`
  flex: 1;
  margin-bottom: 0;
  width: 100%;
`;

const RemoveButton = styled.button`
  width: 40px;
  height: 40px;
  background: #fee2e2;
  border: none;
  border-radius: 8px;
  color: #dc2626;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #fecaca;
  }
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f0f9ff;
  border: 2px dashed #0284c7;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #0284c7;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;

  &:hover {
    background: #e0f2fe;
  }
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const TagInput = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const Tag = styled.div`
  background: #e0f2fe;
  color: #0284c7;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagRemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #0284c7;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #0369a1;
  }
`;

const iconOptions = [
  "🥣",
  "🥗",
  "🍗",
  "🐟",
  "🍲",
  "🥤",
  "🥪",
  "🥘",
  "🍝",
  "🍕",
  "🍔",
  "🌮",
  "🍜",
  "🍱",
  "🥙",
];

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
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

const UnitSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const AmountInput = styled(Input)`
  margin-bottom: 0;
  max-width: 120px;
`;

export const RecipeForm = ({ onSubmit, recipe, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    id: recipe?.id || Date.now(),
    name: recipe?.name,
    description: recipe?.description,
    icon: recipe?.icon,
    calories: recipe?.calories,
    protein: recipe?.protein,
    carbs: recipe?.carbs,
    fat: recipe?.fat,
    time: recipe?.time,
  }));

  const [predefinedIngredients] = useIngredients();

  const [ingredients, setIngredients] = useState(
    () =>
      recipe?.ingredients.map((i) => {
        // recipe.ingredients are referenced only by id
        const ing = predefinedIngredients.find((ing) => ing.id === i.id);
        return { name: ing.name, ...i };
      }) || [],
  );
  const [instructions, setInstructions] = useState(
    recipe?.instructions || [""],
  );
  const [tags, setTags] = useState(recipe?.tags || []);
  const [currentTag, setCurrentTag] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconSelect = (icon) => {
    setFormData((prev) => ({ ...prev, icon }));
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), unit: "g", amount: 0, name: "" },
    ]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, { value }) => {
    const ing = predefinedIngredients.find((i) => i.id === value);
    const newIngredients = [...ingredients];
    newIngredients[index].name = ing.name;
    newIngredients[index].id = ing.id;

    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const updateIngredientAmount = (index, amount) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = Number(amount);
    setIngredients(newIngredients);
  };

  const updateIngredientUnit = (index, amount) => {
    const newIngredients = [...ingredients];
    newIngredients[index].unit = amount;
    setIngredients(newIngredients);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...formData,
      ingredients: ingredients.map(({ id, amount, unit }) => ({
        id,
        amount,
        unit,
      })),
      instructions: instructions.filter((i) => i.trim()),
      tags,
    };

    onSubmit(newRecipe);
  };

  const isFormValid =
    formData.name &&
    formData.description &&
    formData.calories &&
    formData.protein &&
    formData.carbs &&
    formData.fat &&
    formData.time;

  // const selectIngredient = (index, ingredientName, servingSize) => {
  //   const newIngredients = [...ingredients];
  //   newIngredients[index] = `${servingSize} ${ingredientName}`;
  //   setIngredients(newIngredients);
  //   setShowDropdown(null);
  // };

  // const getFilteredIngredients = (query) => {
  //   if (!query.trim()) return predefinedIngredients;
  //   return predefinedIngredients.filter((ing) =>
  //     ing.name.toLowerCase().includes(query.toLowerCase()),
  //   );
  // };
  return (
    <form onSubmit={handleSubmit}>
      <FormSection>
        <SectionTitle>Basic Information</SectionTitle>

        <FormGroup>
          <Label>Recipe Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Mediterranean Quinoa Bowl"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your recipe..."
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Recipe Icon</Label>
          <IconSelector>
            {iconOptions.map((icon) => (
              <IconOption
                key={icon}
                type="button"
                $selected={formData.icon === icon}
                onClick={() => handleIconSelect(icon)}
              >
                {icon}
              </IconOption>
            ))}
          </IconSelector>
        </FormGroup>
      </FormSection>

      <FormSection>
        <SectionTitle>Nutritional Information</SectionTitle>

        <MacroInputsRow>
          <FormGroup>
            <Label>Calories (kcal)</Label>
            <Input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              placeholder="320"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Protein (g)</Label>
            <Input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleInputChange}
              placeholder="25"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Carbs (g)</Label>
            <Input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleInputChange}
              placeholder="40"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Fat (g)</Label>
            <Input
              type="number"
              name="fat"
              value={formData.fat}
              onChange={handleInputChange}
              placeholder="12"
              required
            />
          </FormGroup>
        </MacroInputsRow>

        <FormGroup>
          <Label>Preparation Time (minutes)</Label>
          <Input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            placeholder="30"
            required
          />
        </FormGroup>
      </FormSection>

      <FormSection>
        <SectionTitle>Ingredients</SectionTitle>
        {ingredients.map(({ id, amount, unit }, index) => {
          const ingredient = predefinedIngredients.find((ing) => ing.id === id);

          return (
            <Flex gap="8px" key={id}>
              <Select
                selected={{
                  label: ingredient?.name || "",
                  value: ingredient?.id || null,
                }}
                onChange={(opt) => updateIngredient(index, opt)}
                options={predefinedIngredients.map(({ name, id }) => ({
                  label: name,
                  value: id,
                }))}
              />

              <AmountInput
                type="text"
                value={amount}
                onChange={(e) => updateIngredientAmount(index, e.target.value)}
                placeholder="Amount"
              />

              <UnitSelect
                value={unit}
                onChange={(e) => updateIngredientUnit(index, e.target.value)}
              >
                {[
                  "kg",
                  "g",
                  "l",
                  "ml",
                  "cup",
                  "tbsp",
                  "tsp",
                  "oz",
                  "lb",
                  "whole",
                  "bunch",
                  "clove",
                  "piece",
                ].map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </UnitSelect>
              <RemoveButton
                type="button"
                onClick={() => removeIngredient(index)}
              >
                ×
              </RemoveButton>
            </Flex>
          );
        })}

        <AddButton type="button" onClick={addIngredient}>
          + Add Ingredient
        </AddButton>
      </FormSection>

      <FormSection>
        <SectionTitle>Instructions</SectionTitle>
        <DynamicList>
          {instructions.map((instruction, index) => (
            <DynamicItem key={index}>
              <DynamicInput
                type="text"
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              />
              {instructions.length > 1 && (
                <RemoveButton
                  type="button"
                  onClick={() => removeInstruction(index)}
                >
                  ×
                </RemoveButton>
              )}
            </DynamicItem>
          ))}
        </DynamicList>
        <AddButton type="button" onClick={addInstruction}>
          + Add Step
        </AddButton>
      </FormSection>

      <FormSection>
        <SectionTitle>Tags</SectionTitle>
        <FormGroup>
          <Label>Add tags to categorize your recipe</Label>
          <TagInput>
            <Input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="e.g., Breakfast, High Protein, Quick"
            />
            <SecondaryButton type="button" onClick={addTag}>
              Add Tag
            </SecondaryButton>
          </TagInput>
        </FormGroup>

        {tags.length > 0 && (
          <TagList>
            {tags.map((tag) => (
              <Tag key={tag}>
                {tag}
                <TagRemoveButton type="button" onClick={() => removeTag(tag)}>
                  ×
                </TagRemoveButton>
              </Tag>
            ))}
          </TagList>
        )}
        <ActionButtons>
          <SecondaryButton type="button" onClick={onCancel}>
            Cancel
          </SecondaryButton>

          <PrimaryButton type="submit" disabled={!isFormValid}>
            Save
          </PrimaryButton>
        </ActionButtons>
      </FormSection>
    </form>
  );
};
