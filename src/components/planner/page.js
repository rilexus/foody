"use client";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Flex } from "../../ui/Flex";
import { useRecipes } from "../../hooks/use-recipes";
import { useMealPlans } from "../../hooks/use-meal-plans";
import { useDialog } from "../../ui/Prompt";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const Container = styled.div``;

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
  flex-direction: row;
  gap: 20px;
  flex: 1;
  // min-height: 500px;
  // overflow-x: scroll;
`;

const Column = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ColumnHeader = styled.div`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
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
  font-size: 24px;
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
  font-size: 12px;
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
  background: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 220px;
  height: calc(100vh - 70px);
  padding: 0 24px;
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  padding: 0 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

const StatUnit = styled.span`
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;
  margin-left: 4px;
`;

const SplitViewContainer = styled.div`
  display: flex;
  height: 90vh;
  overflow-y: scroll;
`;

const SplitView = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const Recipe = ({ recipe }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "recipe",
    item: { id: recipe.id },
    collect: (monitor) => ({
      previewStyle: {
        style: {
          opacity: monitor.isDragging() ? 0.1 : 1,
        },
      },
      isDragging: monitor.isDragging(),
    }),
  }));

  return !collected.isDragging ? (
    <RecipeCard ref={drag}>
      <RecipeHeader>
        <RecipeIcon>{recipe.icon}</RecipeIcon>
        <RemoveRecipeButton
          onClick={() => removeRecipeFromColumn(column.id, recipe.id)}
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
  ) : (
    <RecipeCard ref={dragPreview} {...collected.previewStyle}>
      <RecipeHeader>
        <RecipeIcon>{recipe.icon}</RecipeIcon>
        <RemoveRecipeButton
          onClick={() => removeRecipeFromColumn(column.id, recipe.id)}
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
  );
};

const RecipeDropColumn = ({ children }) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: ["recipe"],
    collect: (monitor) => {
      return {
        dropStyle: {
          style: {
            outline: monitor.isOver() ? "2px solid blue" : null,
          },
        },
      };
    },
  }));
  return (
    <Column {...collectedProps.dropStyle} ref={drop}>
      {children}
    </Column>
  );
};

export default function PlannerPage() {
  const [availableRecipes] = useRecipes();
  const [mealPlans, setMealPlans] = useMealPlans();
  const { showDialog } = useDialog();

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

  const getRecipeById = (id) => {
    return availableRecipes.find((r) => r.id === id);
  };

  // Calculate weekly statistics
  const calculateWeekStats = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalMeals = 0;

    mealPlans.forEach((plan) => {
      plan.columns.forEach((column) => {
        const recipes = column.recipes.map((id) => getRecipeById(id));
        recipes.forEach((recipe) => {
          if (recipe) {
            totalCalories += recipe.calories;
            totalProtein += recipe.protein;
            totalCarbs += recipe.carbs;
            totalFat += recipe.fat;
            totalMeals += 1;
          }
        });
      });
    });

    // const daysWithMeals = weekPlan.filter((day) => day.meals.length > 0).length;
    // const avgCaloriesPerDay =
    //   daysWithMeals > 0 ? Math.round(totalCalories / daysWithMeals) : 0;

    return {
      totalMeals,
      avgCaloriesPerDay: 1,
      totalProtein,
      totalCarbs,
      totalFat,
      // daysPlanned: daysWithMeals,
      daysPlanned: 1,
    };
  };

  const weekStats = calculateWeekStats();

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

    setMealPlans(
      mealPlans.map((p) => {
        if (p.id === selectedPlanId) {
          return {
            ...p,
            columns: p.columns.map((c) => {
              if (c.id === selectedColumnId) {
                return { ...c, recipes: [...c.recipes, recipe] };
              }
              return c;
            }),
          };
        }
        return p;
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
    <DndProvider backend={HTML5Backend}>
      <Container>
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
                      showDialog({
                        title: "Name",
                        message: "Enter a new name for this meal plan",
                        defaultValue: plan.name,
                        onConfirm: (newName) => {
                          if (newName.trim()) {
                            setMealPlans(
                              mealPlans.map((p) =>
                                p.id === plan.id ? { ...p, name: newName } : p,
                              ),
                            );
                          }
                        },
                      });
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
          <div
            style={{
              overflowY: "scroll",
              flex: 1,
              height: "calc(100vh - 70px)",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <TableHeader>
              <TableTitle>{selectedPlan?.name || "Meal Plan"}</TableTitle>
              <AddColumnButton onClick={addColumn}>+ Add Plan</AddColumnButton>
            </TableHeader>
            <StatsContainer>
              <StatCard>
                <StatLabel>Total Meals</StatLabel>
                <StatValue>{weekStats.totalMeals}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Avg Cal/Day</StatLabel>
                <StatValue>
                  {weekStats.avgCaloriesPerDay}
                  <StatUnit>kcal</StatUnit>
                </StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Protein</StatLabel>
                <StatValue>
                  {weekStats.totalProtein}
                  <StatUnit>g</StatUnit>
                </StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Carbs</StatLabel>
                <StatValue>
                  {weekStats.totalCarbs}
                  <StatUnit>g</StatUnit>
                </StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Fat</StatLabel>
                <StatValue>
                  {weekStats.totalFat}
                  <StatUnit>g</StatUnit>
                </StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Days Planned</StatLabel>
                <StatValue>
                  {weekStats.daysPlanned}
                  <StatUnit>/ 7</StatUnit>
                </StatValue>
              </StatCard>
            </StatsContainer>
            <Table>
              {columns.map((column) => (
                <RecipeDropColumn key={column.id}>
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
                    <Recipe recipe={recipe} key={recipe.id} />
                  ))}

                  <AddRecipeButton onClick={() => openRecipeModal(column.id)}>
                    + Add Recipe
                  </AddRecipeButton>
                </RecipeDropColumn>
              ))}
            </Table>
          </div>
        </Flex>

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
    </DndProvider>
  );
}
