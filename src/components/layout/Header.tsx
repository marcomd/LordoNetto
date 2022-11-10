import { useContext } from "react";
import styled from "styled-components";
import TitleCanvas from "../TitleCanvas";
import { CommonPrimaryTextCss } from "../styled/StyledGlobal";
import { SharedContext } from "../../contexts/SharedContext";

const StyledContainer = styled.div`
  ${CommonPrimaryTextCss}
  text-align: center;
  padding: 1rem 0;
`;

interface Props {
  children: string;
}

export default function Header({ children }: Props) {
  const { mobile } = useContext(SharedContext)

  return (
    <StyledContainer>
      {mobile ? (
        <h1>{children}</h1>
      ) : (
        <TitleCanvas>{children}</TitleCanvas>
      )}
    </StyledContainer>
  );
}
