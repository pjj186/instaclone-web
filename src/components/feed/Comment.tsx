import React from 'react';
import { FatText } from '../shared';
import styled from 'styled-components';

interface ICommentProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
  color: black;
`;

const Comment = (props: ICommentProps) => {
  return (
    <CommentContainer>
      <FatText>{props.author}</FatText>
      <CommentCaption>{props.payload}</CommentCaption>
    </CommentContainer>
  );
};

export default React.memo(Comment);
