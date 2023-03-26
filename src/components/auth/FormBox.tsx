import React, { ReactNode } from "react";
import styled from "styled-components";
import { BaseBox } from "../shared";

interface IFormBox {
  children: ReactNode;
}

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const FormBox = (props: IFormBox) => {
  return <Container>{props.children}</Container>;
};

export default React.memo(FormBox);
