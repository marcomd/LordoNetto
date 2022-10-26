import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  padding: 2rem 0;
`;

const CssCommonInput = css`
  padding: 1rem 1.6rem;
  border-radius: 0.4rem;
  font-family: "Source Sans Pro";
  font-size: 1.3rem;
  transition: 0.3s;
  background-color: rgba(255, 255, 255, 0.7);
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:focus {
    background-color: white;
  }
`;

const StyledTextInput = styled.input`
  ${CssCommonInput}
  border: 1px solid grey;
  max-width: 60%;
`;

const StyledErrorField = styled.div`
  color: red;
  font-weight: bold;
`;

const StyledFormRow = styled.div`
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  ${CssCommonInput}
  width: 10rem;
  margin-top: 1rem;
  color: #591bc5;
  border: none;
  font-weight: 500;
  cursor: pointer;
`;

const StyledResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem auto;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
`;

const StyledResultNormalRow = styled.div``;

const StyledResultMainRow = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  margin-top: 1rem;
`;

export {
  StyledContainer,
  StyledTextInput,
  StyledErrorField,
  StyledFormRow,
  StyledButton,
  StyledResultContainer,
  StyledResultNormalRow,
  StyledResultMainRow
};
