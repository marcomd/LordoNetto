import styled, { css } from "styled-components";
import { MOBILE_LIMIT_WIDTH } from "./StyledGlobal";

const StyledApp = styled.div`
  text-align: center;
  padding: 0rem 2rem;
  max-width: 700px;
  margin: 0 auto;

  @media only screen and (max-width: ${MOBILE_LIMIT_WIDTH}) {
    padding: 0rem 0.4rem;
  }
`;

export {
  StyledApp,
}