import React from "react";
import styled from "styled-components";
import { RecipeForm } from "./recipe-form";

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

export function CreateRecipe() {
  return (
    <FormContainer>
      <Header>
        <PageTitle>Create New Recipe</PageTitle>
        <PageSubtitle>
          Fill in the details below to add a new recipe to your collection
        </PageSubtitle>
      </Header>

      <RecipeForm />
    </FormContainer>
  );
}
