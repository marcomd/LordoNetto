import styled from "styled-components";
import { SITE_URL } from "../../lib/constants"
import {
  CommonSecondaryTextCss,
  CoolSecondaryLink
} from "../styled/StyledGlobal";

const StyledContainer = styled.div`
  ${CommonSecondaryTextCss}
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const writeUsTemplate = `mailto:m.mastrodonato+lordonetto@gmail.com?subject=Greetings!&body=Dear Marco,%0D%0A%0D%0A[insert cute message here] 😍`
const tellAFriendText = `mailto:?subject=A cool net salary calculator&body=Hey, %0D%0A%0D%0Amaybe it can come useful to you 🙂 %0D%0A%0D%0A ${SITE_URL}`

export default function Footer() {
  return (
    <StyledContainer>
      <div>
        Developed by&nbsp;
        <CoolSecondaryLink href={writeUsTemplate}>
          Marco Mastrodonato
        </CoolSecondaryLink>
        &nbsp;with&nbsp;
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </div>
      <div>
        <CoolSecondaryLink href={tellAFriendText}>
          Tell a friend
        </CoolSecondaryLink>
      </div>
      <div>The software is in BETA and by using it you accept it as is.</div>
      <div>2022 All rights reserved.</div>
    </StyledContainer>
  );
}
