import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

interface ICommentsProps {
  photoId: number;
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

interface ICommentForm {
  payload: string;
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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const Comments = (props: ICommentsProps) => {
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
  );

  const { register, handleSubmit, setValue } = useForm<ICommentForm>();
  const onValid = (data: ICommentForm) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId: props.photoId,
        payload,
      },
    });
    setValue('payload', '');
  };
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
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register('payload', {
              required: true,
            })}
            style={{
              color: 'black',
            }}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
};

export default React.memo(Comments);
