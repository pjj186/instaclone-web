import React from 'react';
import { FatText } from '../shared';
import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';

interface ICommentProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
  color: black;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = (props: ICommentProps) => {
  const cleanedPayload = sanitizeHtml(
    props.payload.replace(/#[\w]+/g, '<mark>$&</mark>'),
    {
      allowedTags: ['mark'],
    },
  );
  return (
    <CommentContainer>
      <FatText>{props.author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
};

export default React.memo(Comment);
