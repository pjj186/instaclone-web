import React from "react";
import styled from "styled-components";
import { BaseBox } from "../shared";
import { Link } from "react-router-dom";

interface IBottomBox {
  callToAction: string;
  link: string;
  linkText: string;
}

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

const BottomBox = (props: IBottomBox) => {
  return (
    <SBottomBox>
      <span>{props.callToAction}</span>
      <Link to={props.link}>{props.linkText}</Link>
    </SBottomBox>
  );
};

export default React.memo(BottomBox);
