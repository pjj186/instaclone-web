import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  hasError: boolean;
}

const Input = styled.input<IInputProps>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? 'tomato' : props.theme.borderColor)};
  margin-top: 5px;
  color: black;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default React.memo(Input);
