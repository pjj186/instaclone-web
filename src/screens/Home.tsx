import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/Photo';

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
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  const histroy = useHistory();

  return (
    <div>
      {data?.seeFeed?.map((photo: any) => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default Home;
