import styled from "styled-components";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";


import { 
  SITE_URL, 
  SITE_NAME, 
  SITE_THUMBNAIL 
} from "../../lib/constants"

import {
  CommonSecondaryTextCss,
  CoolSecondaryLink
} from "../styled/StyledGlobal";

import { useTranslation } from "react-i18next";

const StyledContainer = styled.div`
  ${CommonSecondaryTextCss}
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
`;
const StyledSocialRow = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
`

const writeUsTemplate = `mailto:m.mastrodonato+lordonetto@gmail.com?subject=Greetings!&body=Dear Marco,%0D%0A%0D%0A[insert cute message here] 😍`
const tellAFriend = {
  title: "Un moderno calcolatore di stipendio",
  body: "Fico questo calcolatore di stipendio 🤟",
  hashtags: ["calcolatore", "stipendio", "netto", "cool"],
  hashtag: function() { return this.hashtags.map(t => `#${t}`).join(' ') },
  siteName: SITE_NAME,
  url: SITE_URL,
  media: SITE_THUMBNAIL,
}
const iconSize=32

export default function Footer() {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <div>{t('footer.tellAFriend')}</div>
      <StyledSocialRow>
        <WhatsappShareButton url={tellAFriend.url} title={tellAFriend.body}>
          <WhatsappIcon size={iconSize} round={true}/>
        </WhatsappShareButton>
        <EmailShareButton url={tellAFriend.url} subject={tellAFriend.title} body={tellAFriend.body}>
          <EmailIcon size={iconSize} round={true}/>
        </EmailShareButton>
        <FacebookShareButton url={tellAFriend.url} quote={tellAFriend.body} hashtag={tellAFriend.hashtag()}>
          <FacebookIcon size={iconSize} round={true}/>
        </FacebookShareButton>
        <PinterestShareButton url={tellAFriend.url} description={tellAFriend.body} media={tellAFriend.media}>
          <PinterestIcon size={iconSize} round={true}/>
        </PinterestShareButton>
        <LinkedinShareButton url={tellAFriend.url} title={tellAFriend.title} summary={tellAFriend.body} source={tellAFriend.siteName}>
          <LinkedinIcon size={iconSize} round={true}/>
        </LinkedinShareButton>
        <TumblrShareButton url={tellAFriend.url} title={tellAFriend.title} caption={tellAFriend.body} tags={tellAFriend.hashtags}>
          <TumblrIcon size={iconSize} round={true}/>
        </TumblrShareButton>
        <TwitterShareButton url={tellAFriend.url} title={tellAFriend.title} hashtags={tellAFriend.hashtags}>
          <TwitterIcon size={iconSize} round={true}/>
        </TwitterShareButton>
        <RedditShareButton url={tellAFriend.url} title={tellAFriend.body}>
          <RedditIcon size={iconSize} round={true}/>
        </RedditShareButton>
        <TelegramShareButton url={tellAFriend.url} title={tellAFriend.body}>
          <TelegramIcon size={iconSize} round={true}/>
        </TelegramShareButton>
      </StyledSocialRow>
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
      <div>The software is in BETA and by using it you accept it as is.</div>
      <div>2022 All rights reserved.</div>
    </StyledContainer>
  );
}
