import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useShopingList } from "../../state/hooks/use-shoping-list";
import { useIngredients } from "../../state/hooks/use-ingredients";

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #e0e7ff 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
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

const SecondaryButton = styled.button`
  background: white;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #0284c7;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const Content = styled.div`
  background: white;
  // border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

const FilterRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.$active ? "#0284c7" : "#d1d5db")};
  background: ${(props) => (props.$active ? "#e0f2fe" : "white")};
  color: ${(props) => (props.$active ? "#0284c7" : "#6b7280")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0284c7;
    background: #f0f9ff;
  }
`;

const CategorySection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryIcon = styled.span`
  font-size: 24px;
`;

const ItemCount = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ShoppingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${(props) => (props.$checked ? "#f9fafb" : "white")};
  border: 1px solid ${(props) => (props.$checked ? "#e5e7eb" : "#d1d5db")};
  border-radius: 12px;
  transition: all 0.2s;
  opacity: ${(props) => (props.$checked ? 0.6 : 1)};

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #0284c7;
`;

const ItemIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  text-decoration: ${(props) => (props.$checked ? "line-through" : "none")};
`;

const ItemDetails = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const ItemQuantity = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0284c7;
  margin-right: 16px;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const AddItemSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #e5e7eb;
`;

const AddItemInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  color: #1f2937;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
  }
`;

const UnitSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
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

// const Select = styled.select`
//   padding: 12px 16px;
//   border: 1px solid #d1d5db;
//   border-radius: 10px;
//   font-size: 14px;
//   color: #1f2937;
//   transition: all 0.2s;
// `;

const measurementUnits = [
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
];

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

const Select = ({ options, value = "", onChange }) => {
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

export default function ShoppingListPage() {
  const [activeFilter, setActiveFilter] = useState("byGroup");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("kg");

  const [items, setItems] = useShopingList();
  const [ingredients] = useIngredients();

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Math.max(...items.map((i) => i.id), 0) + 1,
        name: newItemName,
        icon: "📦",
        unit: newItemUnit,

        quantity: newItemQuantity || "1",
        category: "Other",
        checked: false,
      };
      setItems([...items, newItem]);
      setNewItemName("");
      setNewItemQuantity("");
      setNewItemUnit("kg");
    }
  };

  const clearCompleted = () => {
    setItems(items.filter((item) => !item.checked));
  };

  const categories = [
    "byGroup",
    "Protein",
    "Vegetables",
    "Grains",
    "Dairy",
    "Fruits",
    "Nuts & Seeds",
    "Oils",
    "Other",
  ];

  const filteredItems =
    activeFilter === "byGroup"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const uncheckedItems = totalItems - checkedItems;
  const completionPercentage =
    totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const categoryIcons = {
    Protein: "🍗",
    Vegetables: "🥬",
    Grains: "🌾",
    Dairy: "🥛",
    Fruits: "🍎",
    "Nuts & Seeds": "🥜",
    Oils: "🫒",
    Other: "📦",
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>Shopping List</Title>
        </HeaderLeft>
        <HeaderActions>
          <SecondaryButton onClick={clearCompleted}>
            Clear Completed
          </SecondaryButton>
          <ActionButton
            onClick={() => {
              console.log("[v0] Generating shopping list from meal plan");
              alert("Shopping list generated from this weeks meal plan!");
            }}
          >
            Generate from Meal Plan
          </ActionButton>
        </HeaderActions>
      </Header>

      <StatsRow>
        <StatCard>
          <StatValue>{totalItems}</StatValue>
          <StatLabel>Total Items</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{uncheckedItems}</StatValue>
          <StatLabel>To Buy</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{checkedItems}</StatValue>
          <StatLabel>Purchased</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{completionPercentage}%</StatValue>
          <StatLabel>Complete</StatLabel>
        </StatCard>
      </StatsRow>

      <Content>
        <FilterRow>
          {categories.map((category) => (
            <FilterButton
              key={category}
              $active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category === "byGroup" ? "By Group" : category}
            </FilterButton>
          ))}
        </FilterRow>

        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <CategorySection key={category}>
            <CategoryHeader>
              <CategoryTitle>
                <CategoryIcon>{categoryIcons[category] || "📦"}</CategoryIcon>
                {category}
              </CategoryTitle>
              <ItemCount>
                {categoryItems.length} item
                {categoryItems.length !== 1 ? "s" : ""}
              </ItemCount>
            </CategoryHeader>
            <ItemsList>
              {categoryItems.map((item) => (
                <ShoppingItem key={item.id} $checked={item.checked}>
                  <Checkbox
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                  />
                  <ItemIcon>{item.icon}</ItemIcon>
                  <ItemInfo>
                    <ItemName $checked={item.checked}>{item.name}</ItemName>
                    {item.notes && <ItemDetails>{item.notes}</ItemDetails>}
                  </ItemInfo>
                  <ItemQuantity>
                    {item.quantity} {item.unit}
                  </ItemQuantity>
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    ×
                  </RemoveButton>
                </ShoppingItem>
              ))}
            </ItemsList>
          </CategorySection>
        ))}

        <AddItemSection>
          {/* <AddItemInput
            type="text"
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
          /> */}
          <Select
            value={newItemName}
            onChange={({ label }) => setNewItemName(label)}
            options={ingredients.map(({ name }) => ({
              label: name,
              value: name,
            }))}
          />
          <AddItemInput
            type="text"
            placeholder="Quantity"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            style={{ maxWidth: "150px" }}
          />
          <Select
            value={newItemUnit}
            options={measurementUnits.map((u) => ({ label: u, value: u }))}
            onChange={({ value }) => setNewItemUnit(value)}
          />

          <AddButton onClick={addItem}>Add Item</AddButton>
        </AddItemSection>
      </Content>
    </Container>
  );
}
