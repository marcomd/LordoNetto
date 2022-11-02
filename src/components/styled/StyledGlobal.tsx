import styled, { css } from "styled-components";

const CommonPrimaryTextCss = css`
  color: ${(props) => props.theme.primary.color};
`;

const CommonSecondaryTextCss = css`
  color: ${(props) => props.theme.secondary.color};
`;

const CoolSecondaryLink = styled.a`
  ${CommonSecondaryTextCss}
  &:hover {
    ${CommonPrimaryTextCss}
  }
  transition: 0.5s;
`;

const CoolPrimaryLink = styled.a`
  ${CommonPrimaryTextCss}
  &:hover {
    ${CommonSecondaryTextCss}
  }
  transition: 0.5s;
`;

export {
  CommonPrimaryTextCss,
  CommonSecondaryTextCss,
  CoolPrimaryLink,
  CoolSecondaryLink
};
