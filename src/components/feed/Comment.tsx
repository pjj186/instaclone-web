import React from 'react';
import { FatText } from '../shared';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ICommentProps {
  author: string;
  payload: string;
}

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  color: black;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = (props: ICommentProps) => {
  return (
    <CommentContainer>
      <FatText>{props.author}</FatText>
      <CommentCaption>
        {props.payload.split(' ').map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          ),
        )}
      </CommentCaption>
    </CommentContainer>
  );
};

export default React.memo(Comment);
