import { useState } from "react";
import styled, { css } from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1<any>`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>to Dark</button>
      <button onClick={() => darkModeVar(false)}>to Light</button>
    </Container>
  );
};

export default Login;
