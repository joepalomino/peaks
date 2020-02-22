import React from "react";
import { useAuth0 } from "../contexts/auth0-context";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { ReactComponent as LogoChart } from "./icons/logo-chart.svg";
import { useTheme } from "emotion-theming";
import { GridContainer, mq } from "./SharedStyleComponents";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Tagline = styled.div`
  ${tw`text-4xl font-medium font-semibold leading-tight md:text-5xl max-w-md md:leading-none`}
`;

const Button = styled.div`
  ${tw`w-full my-1 text-center text-white bg-peak-blue py-3 px-6 inline-block rounded-lg cursor-pointer font-semibold`}
  &:hover: {
    filter: brightness(1.25);
  }
  ${props =>
    props.weak &&
    tw`bg-white border-2 text-peak-blue border-peak-blue hover:bg-peak-blue hover:border-white hover:text-white`}
`;

const Card = styled.div(tw`bg-white rounded-lg px-6 py-10 mb-4 w-full`, {
  boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.25)'
});

function Login() {
  const theme = useTheme();
  const { loginWithRedirect } = useAuth0();

  return (
    <section css={{ marginTop: 80, backgroundColor: theme.bgColor }}>
      <GridContainer>
        <div>
          <Tagline css={{ color: theme.txtColor }}>
            Know when you are at your best.
          </Tagline>
        </div>
      </GridContainer>
      <div css={tw`md:flex flex-row-reverse md:mt-10 items-center`}>
        <div
          css={{ margin: "100px 0 0 0", [mq[0]]: { marginTop: 0, flex: "1" } }}
        >
          <LogoChart css={{ width: "100%", height: "auto" }} />
        </div>
        <GridContainer
          addCss={{
            [mq[0]]: {
              gridTemplateColumns: "[left-gutter] 1fr [content] 6fr",
              flex: "1"
            }
          }}
        >
          <Card>
            <div css={tw`mb-1`}>Let’s get started</div>
            <Button onClick={() => loginWithRedirect({})}>Sign up</Button>
            <Button weak onClick={() => loginWithRedirect({})}>
              Sign in
            </Button>
          </Card>
        </GridContainer>
      </div>
    </section>
  );
}

export default Login;
