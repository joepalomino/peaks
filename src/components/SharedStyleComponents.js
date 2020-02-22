import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { useTheme } from "emotion-theming";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const bps = [768,992,1024]

export const mq = bps.map(bp => `@media (min-width: ${bp}px)`)

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "[left-gutter] 1fr [content] 12fr [right-gutter] 1fr"
});

export const GridContainer = ({ children, addCss = '' }) => (
  <Grid css={{...addCss}}>
    <div css={{ gridColumn: "content / content" }}>{children}</div>
  </Grid>
);
