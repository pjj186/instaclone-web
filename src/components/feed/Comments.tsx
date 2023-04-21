import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import Comment from './Comment';

interface ICommentsProps {
  author: string;
  caption: string;
  commentNumber: number;
  comments: {
    id: number;
    user: {
      username: string;
      avatar: string;
    };
    payload: string;
    isMine: boolean;
    createdAt: string;
  }[];
}

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin: 10px 0px;
  color: black;
  display: block;
  font-weight: 600;
`;

const Comments = (props: ICommentsProps) => {
  return (
    <CommentsContainer>
      <Comment author={props.author} payload={props.caption} />
      <CommentCount>
        {props.commentNumber === 1
          ? '1 comment'
          : `${props.commentNumber} comments`}
      </CommentCount>
      {props.comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
};

export default React.memo(Comments);
