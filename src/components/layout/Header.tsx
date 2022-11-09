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
  children: string;
}

export default function Header({ mobile, children }: Props) {
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
