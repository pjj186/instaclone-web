import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCompass, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Header = () => {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          <Icon>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faCompass} size="lg" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Icon>
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default React.memo(Header);
