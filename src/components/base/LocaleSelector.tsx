import { useTranslation } from "react-i18next";
import styled from "styled-components"
//import { MOBILE_LIMIT_WIDTH } from "../styled/StyledGlobal";

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  height: 2rem;
  width: 2rem;
  overflow: hidden;
  &:hover {
    font-size: 1.4rem;
    transition: 0.2s ease;
  }
  &.selected {
    border-radius: 3rem;
    background-color: rgba(255, 255, 255, 0.1);
    transition: 0.5s ease;
  }
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /*
  TODO: Would be great have the buttons floating on the left but it breaks tab links layout
  @media only screen and (max-width: MOBILE_LIMIT_WIDTH) {
    position: -webkit-sticky;
    position: sticky;
    top: 1rem;
    align-items: start;
    justify-content: start;
    flex-direction: column;
  }
  */
`

export default function LocaleSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("changeLanguage", lng)
    i18n.changeLanguage(lng);
  };

  return (
  <StyledContainer>
    <StyledButton className={i18n.language === "en" ? "selected" : ""} onClick={() => changeLanguage("en")}>🇬🇧</StyledButton>
    <StyledButton className={i18n.language === "it" ? "selected" : ""} onClick={() => changeLanguage("it")}>🇮🇹</StyledButton>
  </StyledContainer>
  )
}