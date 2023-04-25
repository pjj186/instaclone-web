import React from 'react';
import { FatText } from '../shared';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  ApolloCache,
  NormalizedCacheObject,
  gql,
  useMutation,
} from '@apollo/client';

interface ICommentProps {
  author: string;
  payload: string;
  id?: number;
  isMine?: boolean;
  photoId?: number;
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

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const Comment = (props: ICommentProps) => {
  const updateDeleteComment = (
    cache: ApolloCache<NormalizedCacheObject>,
    result: any,
  ) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: `Comment:${props.id}`,
      });
      cache.modify({
        id: `Photo:${props.photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id: props.id,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

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
      {props.isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
};

export default React.memo(Comment);
