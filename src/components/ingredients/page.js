import React from "react";
import styled from "styled-components";
import { useState } from "react";
import EditIngredientPage from "./edit-ingredient";
import { useIngredients } from "../../state/hooks/use-ingredients";
import { useRecipes } from "../../state/hooks/use-recipes";

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  overflow-y: scroll;
  height: 100vh;
`;

const Header = styled.div`
  padding: 32px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
  justify-content: space-between;
  align-items: center;

  gap: 16px;
`;

const SearchBar = styled.input`
  flex: 1;
  max-width: 400px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 14px;
  color: #1f2937;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 18px;
  border: 1px solid ${(props) => (props.$active ? "#0284c7" : "#d1d5db")};
  border-radius: 12px;
  background: ${(props) => (props.$active ? "#0284c7" : "white")};
  color: ${(props) => (props.$active ? "white" : "#6b7280")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.$active ? "#0369a1" : "#f9fafb")};
    border-color: ${(props) => (props.$active ? "#0369a1" : "#9ca3af")};
  }
`;

const AddButton = styled.button`
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

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

const IngredientCard = styled.div`
  background: white;

  padding: 20px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  border: 1px solid transparent;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #0284c7;
  }
`;

const EditButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
  }
`;

const IngredientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const IngredientIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
`;

const IngredientInfo = styled.div`
  flex: 1;
  // min-width: 200px;
`;

const IngredientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 6px 0;
`;

const IngredientCategory = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
`;

const NutritionalInfo = styled.div`
  display: flex;
  gap: 24px;
  flex-shrink: 0;
`;

const NutritionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const NutritionValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

const NutritionLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IngredientDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  color: #1f2937;
  font-weight: 600;
  font-size: 13px;
`;

const StockBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => (props.$inStock ? "#d1fae5" : "#fee2e2")};
  color: ${(props) => (props.$inStock ? "#065f46" : "#991b1b")};
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const SplitViewContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: scroll;
`;
const SplitView = styled.div`
  flex: 1;
  height: 100vh;
  // padding: 32px;
  overflow-y: scroll;
`;
export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [editIngredient, setEditIngredient] = useState(null);
  const [addIngredient, setAddIngredient] = useState(false);

  const [ingredients, setIngredients] = useIngredients();

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch =
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      ingredient.category.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleSave = (ingr) => {
    setIngredients((ingrid) => {
      return [ingr, ...ingrid.filter(({ id }) => ingr.id !== id)];
    });
  };

  const [recipes] = useRecipes();

  const handleDelete = (ingr) => {
    const ingredients = recipes.map(({ ingredients }) => ingredients).flat();

    if (ingredients.find(({ id }) => id === ingr.id)) {
      alert(
        `Cant delete ${ingr.name}! One of your recipes is using ${ingr.name}`,
      );
      return;
    }
    setIngredients((ingrid) => {
      return [...ingrid.filter(({ id }) => ingr.id !== id)];
    });
    setEditIngredient(null);
  };

  const categories = [
    "all",
    "protein",
    "vegetables",
    "grains",
    "fruits",
    "dairy",
    "nuts",
  ];

  return (
    <SplitViewContainer>
      <SplitView>
        <Header>
          <PageTitle>Ingredients Library</PageTitle>
          <PageDescription>
            Manage your ingredient inventory and nutritional information
          </PageDescription>
        </Header>

        <Controls>
          <SearchBar
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterGroup>
            {categories.map((category) => (
              <FilterButton
                key={category}
                $active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
          </FilterGroup>
          <AddButton
            onClick={() => {
              setAddIngredient(true);
            }}
          >
            + Add Ingredient
          </AddButton>
        </Controls>

        <IngredientsList>
          {filteredIngredients.map((ingredient) => (
            <IngredientCard key={ingredient.id}>
              <IngredientIcon>{ingredient.icon}</IngredientIcon>

              <IngredientInfo>
                <IngredientName>{ingredient.name}</IngredientName>
                <IngredientCategory>{ingredient.category}</IngredientCategory>
              </IngredientInfo>

              <NutritionalInfo>
                <NutritionItem>
                  <NutritionValue>{ingredient.calories}</NutritionValue>
                  <NutritionLabel>Calories</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{ingredient.protein}g</NutritionValue>
                  <NutritionLabel>Protein</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{ingredient.carbs}g</NutritionValue>
                  <NutritionLabel>Carbs</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{ingredient.fat}g</NutritionValue>
                  <NutritionLabel>Fat</NutritionLabel>
                </NutritionItem>
              </NutritionalInfo>

              <IngredientDetails>
                {/* <DetailItem>
                  <DetailValue>{ingredient.servingSize}</DetailValue>
                  <DetailLabel>Serving</DetailLabel>
                </DetailItem>
                <DetailItem>
                  <DetailValue>{ingredient.storage}</DetailValue>
                  <DetailLabel>Storage</DetailLabel>
                </DetailItem> */}
                <DetailItem>
                  <StockBadge $inStock={ingredient.inStock}>
                    {ingredient.inStock ? "In Stock" : "Out"}
                  </StockBadge>
                  <DetailLabel>Status</DetailLabel>
                </DetailItem>
              </IngredientDetails>

              <EditButton
                onClick={() => {
                  setEditIngredient(ingredient);
                }}
              >
                Edit
              </EditButton>
            </IngredientCard>
          ))}
        </IngredientsList>
      </SplitView>

      {editIngredient && (
        <SplitView>
          <EditIngredientPage
            onDelete={handleDelete}
            ingredient={editIngredient}
            onSave={(i) => {
              handleSave(i);
              setEditIngredient(null);
            }}
            onCancel={() => {
              setEditIngredient(null);
            }}
          />
        </SplitView>
      )}
      {addIngredient && (
        <SplitView>
          <EditIngredientPage
            // ingredient={addIngredient}
            onSave={(i) => {
              handleSave(i);
              setAddIngredient(false);
            }}
            onCancel={() => {
              setAddIngredient(false);
            }}
          />
        </SplitView>
      )}
    </SplitViewContainer>
  );
}
