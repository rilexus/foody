import React from "react";
import styled from "styled-components";
import { useApplicationState } from "../../../hooks/use-application-state";
import { useIngredients } from "../../../state/hooks/use-ingredients";
import { calcWeeklyShoppingList } from "../../../utils/calcWeeklyShoppingList";

const ShoppingListSidebar = styled.div`
  width: 220px;
  background: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ShoppingListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 10px;
  transition: all 0.2s;

  &:hover {
    background: #e0f2fe;
  }
`;

const ShoppingListIcon = styled.div`
  font-size: 20px;
`;

const ShoppingListContent = styled.div`
  flex: 1;
`;

const ShoppingListName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

const ShoppingListAmount = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const EmptyShoppingList = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #9ca3af;
  font-size: 14px;
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

export const ShoppingList = ({ mealPlanId }) => {
  const [state] = useApplicationState();
  const [ingredients] = useIngredients();
  const { shopping } = calcWeeklyShoppingList(state, mealPlanId);

  const shoppingList = shopping.map(({ ingredientId, ...rest }) => ({
    ...ingredients.find(({ id }) => ingredientId === id),
    ...rest,
  }));

  console.log(shoppingList);

  return (
    <ShoppingListSidebar>
      <SidebarHeader>
        <SidebarTitle>Shopping List</SidebarTitle>
      </SidebarHeader>

      {shoppingList.length > 0 ? (
        shoppingList.map((item, index) => (
          <ShoppingListItem key={index}>
            <ShoppingListIcon>{item.icon}</ShoppingListIcon>
            <ShoppingListContent>
              <ShoppingListName>{item.name}</ShoppingListName>
              <ShoppingListAmount>
                {item.toBuyAmount} {item.unit}
              </ShoppingListAmount>
            </ShoppingListContent>
          </ShoppingListItem>
        ))
      ) : (
        <EmptyShoppingList>
          Add recipes to your meal plan to generate a shopping list
        </EmptyShoppingList>
      )}
    </ShoppingListSidebar>
  );
};
