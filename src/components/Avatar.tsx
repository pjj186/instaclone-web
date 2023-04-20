import React from 'react';
import styled from 'styled-components';

interface IAvatarProps {
  url?: string;
}

const SAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.fontColor};
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = (props: IAvatarProps) => {
  return <SAvatar>{props.url ? <Img src={props.url} /> : null}</SAvatar>;
};

export default React.memo(Avatar);
