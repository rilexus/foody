import React from "react";
import styled from "styled-components";
import { RecipeForm } from "./recipe-form";
import { useRecipes } from "../../hooks/use-recipes";

const FormContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const Header = styled.div`
  padding-left: 32px;
  padding-top: 32px;
  background-color: white;
`;

const PageSubtitle = styled.div`
  font-size: 16px;
  color: #6b7280;
  // margin: 0 0 32px 0;
`;

export function EditRecipe({ recipe, onSave, onCancel }) {
  
  return (
    <FormContainer>
      <Header>
        <PageTitle>Edit Recipe</PageTitle>
        <PageSubtitle>
          Fill in the details below to edit the recipe
        </PageSubtitle>
      </Header>

      <RecipeForm recipe={recipe} onCancel={onCancel} onSubmit={onSave} />
    </FormContainer>
  );
}
