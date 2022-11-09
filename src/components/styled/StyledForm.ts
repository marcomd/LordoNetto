import styled, { css } from "styled-components";
import { MOBILE_LIMIT_WIDTH } from "./StyledGlobal";

const StyledContainer = styled.div`
  padding: 1rem 0 3rem;
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
    background-color: ${(props) => props.theme.primary.color};
  }
`;

const StyledTextInput = styled.input`
  ${CssCommonInput}
  border: 1px solid ${(props) => props.theme.secondary.color};
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
  color: ${(props) => props.theme.primary.backgroundColor};
  width: 10rem;
  margin-top: 1rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
`;

const StyledResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  border: 1px solid ${(props) => props.theme.primary.color};
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem auto;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;

  @media only screen and (max-width: ${MOBILE_LIMIT_WIDTH}) {
    padding: 1rem 0.3rem;
  }
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
  StyledResultContainer,
  StyledResultNormalRow,
  StyledResultMainRow,
  StyledButton
};
