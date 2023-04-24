import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useForm } from 'react-hook-form';
import {
  ApolloCache,
  NormalizedCacheObject,
  gql,
  useMutation,
} from '@apollo/client';
import useUser from '../../hooks/useUser';

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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
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
      id
      error
    }
  }
`;

const Comments = (props: ICommentsProps) => {
  const { data: userData } = useUser();

  const { register, handleSubmit, setValue, getValues } =
    useForm<ICommentForm>();
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
  };

  const createCommentUpdate = (
    cache: ApolloCache<NormalizedCacheObject>,
    result: any,
  ) => {
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: 'Comment',
        createdAt: Date.now(),
        id,
        isMine: true,
        payload: getValues('payload'),
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment CommentFragment on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${props.photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
      setValue('payload', '');
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    },
  );

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
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
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
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default React.memo(Comments);
