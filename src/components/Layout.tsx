import React, { ReactNode } from 'react';
import Header from './Header';
import styled from 'styled-components';

interface ILayoutProps {
  children: ReactNode;
}

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

const Layout = (props: ILayoutProps) => {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
    </>
  );
};

export default React.memo(Layout);
