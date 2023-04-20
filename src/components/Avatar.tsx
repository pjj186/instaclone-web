import React from 'react';
import styled from 'styled-components';

interface IAvatarProps {
  url?: string;
  lg?: boolean;
}

interface IAvatarStyleProps {
  lg?: boolean;
}

const SAvatar = styled.div<IAvatarStyleProps>`
  width: ${(props) => (props.lg ? '30px' : '25px')};
  height: ${(props) => (props.lg ? '30px' : '25px')};
  border-radius: 50%;
  background-color: ${(props) => props.theme.fontColor};
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = (props: IAvatarProps) => {
  return (
    <SAvatar lg={props.lg}>
      {props.url ? <Img src={props.url} /> : null}
    </SAvatar>
  );
};

export default React.memo(Avatar);
