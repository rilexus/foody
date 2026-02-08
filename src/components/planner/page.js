"use client";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { PageHeader, PageSubtitle, PageTitle } from "../../ui/Page";
import { Flex } from "../../ui/Flex";

const Container = styled.div`
  height: 90vh;
  overflow-y: scroll;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const TableWrapper = styled.div`
  background: white;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow-x: auto;
  height: 100vh;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const AddColumnButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-height: 500px;
`;

const Column = styled.div`
  min-width: 280px;
  background: #f9fafb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ColumnNameInput = styled.input`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 4px 8px;
  flex: 1;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-bottom-color: #0284c7;
    background: white;
    border-radius: 4px;
  }
`;

const RemoveColumnButton = styled.button`
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fecaca;
  }
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const RecipeIcon = styled.div`
  font-size: 32px;
`;

const RemoveRecipeButton = styled.button`
  background: transparent;
  color: #9ca3af;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #fee2e2;
    color: #dc2626;
  }
`;

const RecipeName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
`;

const RecipeMacros = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6b7280;
`;

const MacroItem = styled.span`
  font-weight: 500;
`;

const AddRecipeButton = styled.button`
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  color: #0284c7;
  border: 2px dashed #0284c7;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #bae6fd 0%, #bfdbfe 100%);
    transform: translateY(-2px);
  }
`;

const RecipeSelectionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 28px;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #1f2937;
  }
`;

const RecipeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RecipeListItem = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid transparent;

  &:hover {
    background: #e0f2fe;
    border-color: #0284c7;
  }
`;

const RecipeListIcon = styled.div`
  font-size: 32px;
`;

const RecipeListInfo = styled.div`
  flex: 1;
`;

const RecipeListName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const RecipeListMacros = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
  min-height: 0;
`;

const Sidebar = styled.div`
  width: 320px;
  background: white;
  // border-radius: 20px;
  padding: 24px;
  // box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SidebarTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const CreatePlanButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
  }
`;

const PlanListItem = styled.div`
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)"
      : "#f9fafb"};
  border: 2px solid ${(props) => (props.$active ? "#0284c7" : "transparent")};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)"
        : "#e0f2fe"};
    border-color: #0284c7;
  }
`;

const PlanListName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const PlanListDescription = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const PlanActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const PlanActionButton = styled.button`
  background: ${(props) => (props.$danger ? "#fee2e2" : "#e0f2fe")};
  color: ${(props) => (props.$danger ? "#dc2626" : "#0284c7")};
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.$danger ? "#fecaca" : "#bae6fd")};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export default function PlannerPage() {
  const router = {};
  const [mealPlans, setMealPlans] = useState([
    {
      id: 1,
      name: "Weekly Plan",
      description: "My standard weekly meal plan",
      columns: [
        { id: 1, name: "Monday", recipes: [] },
        { id: 2, name: "Tuesday", recipes: [] },
        { id: 3, name: "Wednesday", recipes: [] },
      ],
    },
    {
      id: 2,
      name: "Keto Plan",
      description: "Low carb high fat meal plan",
      columns: [
        { id: 4, name: "Day 1", recipes: [] },
        { id: 5, name: "Day 2", recipes: [] },
      ],
    },
  ]);

  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const selectedPlan =
    mealPlans.find((p) => p.id === selectedPlanId) || mealPlans[0];
  const columns = selectedPlan?.columns || [];

  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const createMealPlan = () => {
    const newId = Math.max(...mealPlans.map((p) => p.id), 0) + 1;
    const newPlan = {
      id: newId,
      name: `Plan ${newId}`,
      description: "New meal plan",
      columns: [{ id: Date.now(), name: `Day 1`, recipes: [] }],
    };
    setMealPlans([...mealPlans, newPlan]);
    setSelectedPlanId(newId);
  };

  const deleteMealPlan = (id) => {
    setMealPlans(mealPlans.filter((p) => p.id !== id));
    if (selectedPlanId === id) {
      setSelectedPlanId(mealPlans[0]?.id || 0);
    }
  };

  const availableRecipes = [
    {
      id: 1,
      name: "Oatmeal & Berries",
      icon: "🥣",
      calories: 320,
      protein: 12,
      carbs: 54,
      fat: 8,
      time: 10,
    },
    {
      id: 2,
      name: "Avocado Toast",
      icon: "🥑",
      calories: 280,
      protein: 10,
      carbs: 36,
      fat: 14,
      time: 5,
    },
    {
      id: 3,
      name: "Grilled Chicken Breast",
      icon: "🍗",
      calories: 380,
      protein: 45,
      carbs: 5,
      fat: 18,
      time: 25,
    },
    {
      id: 4,
      name: "Salmon with Vegetables",
      icon: "🐟",
      calories: 420,
      protein: 38,
      carbs: 12,
      fat: 25,
      time: 30,
    },
    {
      id: 5,
      name: "Quinoa Power Bowl",
      icon: "🍲",
      calories: 360,
      protein: 18,
      carbs: 48,
      fat: 12,
      time: 20,
    },
    {
      id: 6,
      name: "Smoothie Bowl",
      icon: "🥤",
      calories: 290,
      protein: 22,
      carbs: 38,
      fat: 6,
      time: 8,
    },
    {
      id: 7,
      name: "Turkey Sandwich",
      icon: "🥪",
      calories: 340,
      protein: 28,
      carbs: 42,
      fat: 9,
      time: 10,
    },
    {
      id: 8,
      name: "Greek Yogurt Parfait",
      icon: "🥛",
      calories: 250,
      protein: 20,
      carbs: 32,
      fat: 6,
      time: 5,
    },
  ];

  const addColumn = () => {
    const newId = Date.now();
    setMealPlans(
      mealPlans.map((p) => {
        if (p.id === selectedPlanId) {
          return {
            ...p,
            columns: [
              ...p.columns,
              { id: newId, name: `Day ${p.columns.length + 1}`, recipes: [] },
            ],
          };
        }
        return p;
      }),
    );
  };

  const removeColumn = (id) => {
    setMealPlans(
      mealPlans.map((p) => {
        if (p.id === selectedPlanId) {
          return { ...p, columns: p.columns.filter((c) => c.id !== id) };
        }
        return p;
      }),
    );
  };
  const updateColumnName = (id, name) => {
    setMealPlans(
      mealPlans.map((p) => {
        if (p.id === selectedPlanId) {
          return {
            ...p,
            columns: p.columns.map((c) => (c.id === id ? { ...c, name } : c)),
          };
        }
        return p;
      }),
    );
  };

  const openRecipeModal = (columnId) => {
    setSelectedColumnId(columnId);
    setShowRecipeModal(true);
  };

  const addRecipeToColumn = (recipe) => {
    if (selectedColumnId === null) return;

    setColumns(
      columns.map((c) => {
        if (c.id === selectedColumnId) {
          return { ...c, recipes: [...c.recipes, recipe] };
        }
        return c;
      }),
    );

    setShowRecipeModal(false);
    setSelectedColumnId(null);
  };

  const removeRecipeFromColumn = (columnId, recipeId) => {
    setColumns(
      columns.map((c) => {
        if (c.id === columnId) {
          return { ...c, recipes: c.recipes.filter((r) => r.id !== recipeId) };
        }
        return c;
      }),
    );
  };

  return (
    <Container>
      <TableWrapper>
        <TableHeader>
          <TableTitle>Your Meal Plans</TableTitle>
          <AddColumnButton onClick={addColumn}>+ Add Plan</AddColumnButton>
        </TableHeader>
        <Flex>
          <Sidebar>
            <SidebarHeader>
              <SidebarTitle>Meal Plans</SidebarTitle>
              <CreatePlanButton onClick={createMealPlan}>
                + New
              </CreatePlanButton>
            </SidebarHeader>

            {mealPlans.map((plan) => (
              <PlanListItem
                key={plan.id}
                $active={plan.id === selectedPlanId}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                <PlanListName>{plan.name}</PlanListName>
                <PlanListDescription>{plan.description}</PlanListDescription>
                <PlanActions>
                  <PlanActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = prompt("Enter new name:", plan.name);
                      if (newName) {
                        setMealPlans(
                          mealPlans.map((p) =>
                            p.id === plan.id ? { ...p, name: newName } : p,
                          ),
                        );
                      }
                    }}
                  >
                    Rename
                  </PlanActionButton>
                  <PlanActionButton
                    $danger
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this plan?")) {
                        deleteMealPlan(plan.id);
                      }
                    }}
                  >
                    Delete
                  </PlanActionButton>
                </PlanActions>
              </PlanListItem>
            ))}
          </Sidebar>

          <Table>
            {columns.map((column) => (
              <Column key={column.id}>
                <ColumnHeader>
                  <ColumnNameInput
                    value={column.name}
                    onChange={(e) =>
                      updateColumnName(column.id, e.target.value)
                    }
                    placeholder="Plan name"
                  />
                  <RemoveColumnButton onClick={() => removeColumn(column.id)}>
                    Remove
                  </RemoveColumnButton>
                </ColumnHeader>

                {column.recipes.map((recipe) => (
                  <RecipeCard key={recipe.id}>
                    <RecipeHeader>
                      <RecipeIcon>{recipe.icon}</RecipeIcon>
                      <RemoveRecipeButton
                        onClick={() =>
                          removeRecipeFromColumn(column.id, recipe.id)
                        }
                      >
                        ×
                      </RemoveRecipeButton>
                    </RecipeHeader>
                    <RecipeName>{recipe.name}</RecipeName>
                    <RecipeMacros>
                      <MacroItem>{recipe.calories} kcal</MacroItem>
                      <MacroItem>{recipe.protein}g P</MacroItem>
                      <MacroItem>{recipe.carbs}g C</MacroItem>
                    </RecipeMacros>
                  </RecipeCard>
                ))}

                <AddRecipeButton onClick={() => openRecipeModal(column.id)}>
                  + Add Recipe
                </AddRecipeButton>
              </Column>
            ))}
          </Table>
        </Flex>
      </TableWrapper>

      {showRecipeModal && (
        <RecipeSelectionModal onClick={() => setShowRecipeModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Select a Recipe</ModalTitle>
              <CloseButton onClick={() => setShowRecipeModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>

            <RecipeList>
              {availableRecipes.map((recipe) => (
                <RecipeListItem
                  key={recipe.id}
                  onClick={() => addRecipeToColumn(recipe)}
                >
                  <RecipeListIcon>{recipe.icon}</RecipeListIcon>
                  <RecipeListInfo>
                    <RecipeListName>{recipe.name}</RecipeListName>
                    <RecipeListMacros>
                      {recipe.calories} kcal • {recipe.protein}g protein •{" "}
                      {recipe.carbs}g carbs • {recipe.time} min
                    </RecipeListMacros>
                  </RecipeListInfo>
                </RecipeListItem>
              ))}
            </RecipeList>
          </ModalContent>
        </RecipeSelectionModal>
      )}
    </Container>
  );
}
