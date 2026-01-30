"use client";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Flex } from "./ui/Flex";
import { Recipes } from "./components/recipes/page";
import SettingsPage from "./components/settings/page";
import IngredientsPage from "./components/ingredients/page";
import ShoppingListPage from "./components/shoping-list/page";

const Container = styled.div`
  display: flex;

  height: 100vh;
  overflow: hidden;

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

const NavItem = styled(Link)`
  display: flex;
  text-decoration: none;
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
  // display: flex;
  // overflow: hidden;
`;

function App() {
  return (
    <HashRouter>
      <Container>
        <Sidebar>
          <Logo>
            <LogoIcon>🍽️</LogoIcon>
            <LogoText>Foody</LogoText>
          </Logo>
          {/* <NavItem $active>📊 Planner</NavItem> */}
          <NavItem to="/">Home</NavItem>
          <NavItem to="/recipes">Recipes</NavItem>
          <NavItem to="/ingredients">Ingredients</NavItem>
          <NavItem to="/shoping-list">Shoping List</NavItem>
          <NavItem to="/settings">⚙️ Settings</NavItem>
          {/* <NavItem>🍴 Meals</NavItem>
          <NavItem>📈 Progress</NavItem>
          <NavItem>⚙️ Settings</NavItem> */}
        </Sidebar>

        <MainContent>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/shoping-list" element={<ShoppingListPage />} />
          </Routes>
        </MainContent>
      </Container>
    </HashRouter>
  );
}

const root = createRoot(document.body);
root.render(<App />);
