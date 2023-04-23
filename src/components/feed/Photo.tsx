import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import Avatar from '../Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import {
  ApolloCache,
  NormalizedCacheObject,
  gql,
  useMutation,
} from '@apollo/client';
import Comments from './Comments';

interface IPhotoProps {
  photo: {
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
    createdAt: string;
    file: string;
    id: number;
    isLiked: boolean;
    isMine: boolean;
    likes: number;
    user: {
      username: string;
      avatar: string;
    };
  };
}

interface LikesData {
  isLikes: boolean;
  likes: number;
}

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  color: black;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: black;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = (props: IPhotoProps) => {
  const updateToggleLike = (
    cache: ApolloCache<NormalizedCacheObject>,
    result: any,
  ) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Photo:${props.photo.id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (props.photo.isLiked) {
              return prev - 1;
            } else {
              return prev + 1;
            }
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: props.photo.id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={props.photo.id}>
      <PhotoHeader>
        <Avatar url={props.photo.user.avatar} lg />
        <Username>{props.photo.user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={props.photo.file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction
              onClick={() => {
                toggleLikeMutation();
              }}
            >
              <FontAwesomeIcon
                style={{
                  color: props.photo.isLiked ? 'tomato' : 'inherit',
                }}
                icon={props.photo.isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <FontAwesomeIcon icon={faBookmark} />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>
          {props.photo.likes === 1 ? '1 like' : `${props.photo.likes} likes`}
        </Likes>
        <Comments
          author={props.photo.user.username}
          caption={props.photo.caption}
          commentNumber={props.photo.commentNumber}
          comments={props.photo.comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default React.memo(Photo);
