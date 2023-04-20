import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  color: black;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  const histroy = useHistory();
  return (
    <div>
      {data?.seeFeed?.map((photo: any) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
