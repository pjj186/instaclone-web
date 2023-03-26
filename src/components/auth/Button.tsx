import React from "react";
import styled from "styled-components";

const SButton = styled.input`
  width: 100%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
`;

const Button = (props: any) => {
  console.log({ ...props });
  return <SButton {...props} />;
};

export default React.memo(Button);
