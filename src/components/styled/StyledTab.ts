import styled from "styled-components";
import { MOBILE_LIMIT_WIDTH } from "../styled/StyledGlobal";

const StyledTabContainer = styled.div`
  box-sizing: border-box;
`;

const StyledTabButton = styled.button`
  padding: 1rem 0;
  width: 33.3%;
  border-radius: 0.5rem 0.5rem 0 0;
  @media only screen and (max-width: ${MOBILE_LIMIT_WIDTH}) {
    padding: 0.3rem 0.6rem;
    margin: 0.1rem auto;
    width: 84%;
    border-radius: 0.5rem;
  }
  cursor: pointer;
  color: white;

  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.3rem solid rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  &.selected {
    border-bottom: 0.3rem solid green;
    background-color: rgba(255, 255, 255, 0.6);
    transition: all 0.5s ease;
    color: green;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const StyledTabContent = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 0.5rem 0.5rem;

  @media only screen and (max-width: ${MOBILE_LIMIT_WIDTH}) {
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding-left: 10px;
    padding-right: 10px;
  }

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &.hidden {
    display: none;
  }
`;

export {
  StyledTabContainer,
  StyledTabButton,
  StyledTabContent,
}