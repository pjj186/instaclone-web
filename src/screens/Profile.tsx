import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PHOTO_FRAGMENT } from '../fragments';

interface IProfileParams {
  username: string;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams<IProfileParams>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  return <div>Profile</div>;
};

export default Profile;
