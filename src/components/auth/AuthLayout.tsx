import React, { ReactNode } from "react";
import styled from "styled-components";

interface IAuthLayout {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const AuthLayout = (props: IAuthLayout) => {
  return (
    <Container>
      <Wrapper>{props.children}</Wrapper>
    </Container>
  );
};

export default React.memo(AuthLayout);
