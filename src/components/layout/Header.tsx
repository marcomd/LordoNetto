import styled from "styled-components";
import TitleCanvas from "../TitleCanvas";
import { CommonPrimaryTextCss } from "../styled/StyledGlobal";

const StyledContainer = styled.div`
  ${CommonPrimaryTextCss}
  text-align: center;
  padding: 1rem 0;
`;

interface Props {
  mobile: boolean;
}

export default function Header({ mobile }: Props) {
  return (
    <StyledContainer>
      {mobile ? (
        <h1>Lordo ➟ Netto</h1>
      ) : (
        <TitleCanvas>Lordo → Netto</TitleCanvas>
      )}
    </StyledContainer>
  );
}
