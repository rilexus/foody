import React, { useState } from "react";
import styled from "styled-components";
import { useRecipes } from "../../hooks/use-recipes";
import { ActionButtons } from "../../ui/ActionButtons";
import { SecondaryButton } from "../../ui/Button";
import { EditRecipe } from "./edit";
import { useIngredients } from "../../state/hooks/use-ingredients";
import { calculateAvailability } from "../../utils/calculate-availability";
import { Tooltip } from "../../ui/Tooltip";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
`;

const Sidebar = styled.aside`
  width: 240px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  margin-bottom: 32px;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const LogoText = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: ${(props) => (props.$active ? "#e0f2fe" : "transparent")};
  border: none;
  border-radius: ${(props) => (props.$active ? "12px" : "0")};
  margin: ${(props) => (props.$active ? "0 12px" : "0")};
  color: ${(props) => (props.$active ? "#0284c7" : "#6b7280")};
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: ${(props) => (props.$active ? "#e0f2fe" : "#f9fafb")};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f9fafb;
    transform: translateX(-4px);
  }
`;

const RecipeContainer = styled.div`
  // max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  overflow-y: scroll;
`;

const RecipeHeader = styled.div`
  background: white;
  // border-radius: 24px;
  padding: 48px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const RecipeTopSection = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`;

const RecipeIconLarge = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #bfdbfe 0%, #dbeafe 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  flex-shrink: 0;
`;

const RecipeMainInfo = styled.div`
  flex: 1;
`;

const RecipeTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
`;

const RecipeDescription = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

const MacroRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const MacroCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 20px;
  flex: 1;
  text-align: center;
`;

const MacroLabel = styled.div`
  font-size: 13px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const MacroValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

const MacroUnit = styled.span`
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
`;

const ContentSection = styled.div`
  background: white;
  // border-radius: 24px;
  padding: 48px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

const Checkmark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${({ color = "#0284c7" }) => color};
  color: white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
`;

const IngredientItem = styled.li`
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #1f2937;
`;

const InstructionsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: instruction-counter;
`;

const InstructionItem = styled.li`
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  gap: 16px;
  font-size: 16px;
  color: #1f2937;
  line-height: 1.6;
  counter-increment: instruction-counter;

  &:before {
    content: counter(instruction-counter);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
    color: white;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
`;

const Tag = styled.span`
  background: #e0f2fe;
  color: #0284c7;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

function Recipe({ id, onClose }) {
  const recipeId = Number(id);
  const [recipes, setRecipes] = useRecipes();

  const [ingredients] = useIngredients();

  const recipe = recipes.find((r) => r.id === recipeId);

  const [editRecipe, setEditRecipe] = useState(null);

  if (editRecipe) {
    return (
      <EditRecipe
        recipe={editRecipe}
        onCancel={() => setEditRecipe(null)}
        onSave={(rec) => {
          setRecipes((recipes) => {
            return [
              rec,
              ...recipes.filter(({ id: recId }) => rec.id !== recId),
            ];
          });
          setEditRecipe(null);
        }}
      />
    );
  }
  return (
    <RecipeContainer>
      <RecipeHeader>
        {/* <BackButton
          onClick={() => {
            onClose();
          }}
        >
          ← Close
        </BackButton> */}
        <RecipeTopSection>
          <RecipeIconLarge>{recipe.icon}</RecipeIconLarge>
          <RecipeMainInfo>
            <RecipeTitle>{recipe.name}</RecipeTitle>
            <RecipeDescription>{recipe.description}</RecipeDescription>
            {/* <ActionButtons>
              <PrimaryButton>+ Add to Meal Plan</PrimaryButton>
              <SecondaryButton>♡ Save Recipe</SecondaryButton>
            </ActionButtons> */}
          </RecipeMainInfo>
        </RecipeTopSection>

        <MacroRow>
          <MacroCard>
            <MacroLabel>Calories</MacroLabel>
            <MacroValue>
              {recipe.calories} <MacroUnit>kcal</MacroUnit>
            </MacroValue>
          </MacroCard>
          <MacroCard>
            <MacroLabel>Protein</MacroLabel>
            <MacroValue>
              {recipe.protein} <MacroUnit>g</MacroUnit>
            </MacroValue>
          </MacroCard>
          <MacroCard>
            <MacroLabel>Carbs</MacroLabel>
            <MacroValue>
              {recipe.carbs} <MacroUnit>g</MacroUnit>
            </MacroValue>
          </MacroCard>
          <MacroCard>
            <MacroLabel>Fat</MacroLabel>
            <MacroValue>
              {recipe.fat} <MacroUnit>g</MacroUnit>
            </MacroValue>
          </MacroCard>
          <MacroCard>
            <MacroLabel>Prep Time</MacroLabel>
            <MacroValue>
              {recipe.time} <MacroUnit>min</MacroUnit>
            </MacroValue>
          </MacroCard>
        </MacroRow>
      </RecipeHeader>

      <ContentSection>
        <SectionTitle>Ingredients</SectionTitle>
        <IngredientsList>
          {recipe.ingredients.map(({ id, amount, unit }, index) => {
            const { name, availableAmount, availableUnit } = ingredients.find(
              (ing) => id === ing.id,
            );

            const isAvailable = calculateAvailability(
              { amount: availableAmount, unit: availableUnit },
              { amount, unit },
            );

            return (
              <IngredientItem key={index}>
                <Tooltip
                  element={
                    <div>{isAvailable ? "Avalable" : "Not Avalable"}</div>
                  }
                >
                  <Checkmark color={isAvailable ? "#0284c7" : "red"}>
                    {isAvailable ? "✓" : "x"}
                  </Checkmark>
                </Tooltip>
                {amount} {unit} {name}
              </IngredientItem>
            );
          })}
        </IngredientsList>

        <SectionTitle>Instructions</SectionTitle>
        <InstructionsList>
          {recipe.instructions.map((instruction, index) => (
            <InstructionItem key={index}>{instruction}</InstructionItem>
          ))}
        </InstructionsList>

        <TagsContainer>
          {recipe.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
        <ActionButtons>
          <SecondaryButton type="button" onClick={() => setEditRecipe(recipe)}>
            Edit
          </SecondaryButton>
        </ActionButtons>
      </ContentSection>
    </RecipeContainer>
  );
}

export { Recipe };
