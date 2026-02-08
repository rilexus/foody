import React, { useState } from "react";
import styled from "styled-components";
import { useRecipes } from "../../state/hooks/use-recipes";
import { Flex } from "../../ui/Flex";
import { PageHeader, PageSubtitle, PageTitle } from "../../ui/Page";
import { CreateRecipe } from "./create";
import { Recipe } from "./recipe";
import { PrimaryButton } from "../../ui/Button";

const RecipePanel = styled.div`
  background: white;
  overflow-y: auto;
  max-width: 400px;
  overflow: scroll;
  height: 100vh;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const PanelHeader = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding: 0 20px;
  color: #1f2937;
  // margin: 0 0 24px 0;
`;

const RecipeGrid = styled.div`
  display: grid;
  gap: 1px;
`;

const RecipeCard = styled.div`
  background: #f9fafb;
  // border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #bfdbfe;
  }
`;

const RecipeIcon = styled.div`
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
`;

const RecipeInfo = styled.div`
  flex: 1;
`;

const RecipeName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 6px 0;
`;

const RecipeDetails = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
`;

const RecipeStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #9ca3af;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Recipes = () => {
  const [recipes] = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(() => recipes[0]);

  return (
    <Flex direction="row">
      <RecipePanel>
        <PageHeader>
          <Flex justifyContent="space-between">
            <div>
              <PageTitle>Recipes</PageTitle>
              <PageSubtitle>All recipes in one list</PageSubtitle>
            </div>
            <PrimaryButton
              onClick={() => setSelectedRecipe(null)}
              style={{
                padding: 0,
                width: "100px",
                height: "40px",
              }}
            >
              Create
            </PrimaryButton>
          </Flex>
        </PageHeader>

        <RecipeGrid>
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <RecipeIcon>{recipe.icon}</RecipeIcon>
                <RecipeInfo>
                  <RecipeName>{recipe.name}</RecipeName>
                  <RecipeDetails>{recipe.description}</RecipeDetails>
                  <RecipeStats>
                    <StatItem>🔥 {recipe.calories} kcal</StatItem>
                    <StatItem>💪 {recipe.protein}g protein</StatItem>
                    <StatItem>⏱️ {recipe.time} min</StatItem>
                  </RecipeStats>
                </RecipeInfo>
              </RecipeCard>
            );
          })}
        </RecipeGrid>
      </RecipePanel>

      {!selectedRecipe && <CreateRecipe />}
      {selectedRecipe && (
        <Recipe
          id={selectedRecipe.id}
          onClose={() => {
            setSelectedRecipe(null);
          }}
        />
      )}
    </Flex>
  );
};
