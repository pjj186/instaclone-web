import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  console.log(params);
  return <div>Profile</div>;
};

export default Profile;
