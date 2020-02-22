import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { ReactComponent as LogoPeak } from "./icons/logo-peak.svg";
import { useTheme } from "emotion-theming";
import { GridContainer } from "./SharedStyleComponents";

/**@jsx jsx */
import { jsx } from "@emotion/core";

const LogoText = styled.span(tw`text-4xl`, {
  fontFamily: "'merriweather', cursive"
});

function Nav() {
  return (
    <div css={tw`bg-white`}>
      <GridContainer>
        <div css={tw`flex py-6`}>
          <span>
            <LogoPeak />
          </span>
          <LogoText css={tw`flex leading-none text-peak-navy-blue`}>Peaks</LogoText>
        </div>
      </GridContainer>
    </div>
  );
}

export default Nav;
