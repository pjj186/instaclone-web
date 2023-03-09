import { useState } from "react";
import styled, { css } from "styled-components";
import { isLoggedInVar } from "../apollo";

const Title = styled.h1<any>`
  color: ${(props: any) => (props.potato ? "palevioletred" : "beige")};
  ${(props: any) =>
    props.potato
      ? css`
          font-family: 49px;
        `
      : css`
          text-decoration: underline;
        `}
`;

const Container = styled.div`
  background-color: tomato;
`;

const TogglePotato = styled.button`
  color: red;
`;

const Login = () => {
  const [potato, setPotato] = useState(false);
  const togglePotato = () => setPotato((current) => !current);
  return (
    <Container>
      <Title potato={potato}>Login</Title>
      <TogglePotato onClick={togglePotato}>Toggle Potato</TogglePotato>
    </Container>
  );
};

export default Login;
