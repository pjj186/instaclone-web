import { useHistory } from 'react-router-dom';
import { logUserOut } from '../apollo';

const Home = () => {
  const histroy = useHistory();
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut(histroy)}>Log out now!</button>
    </div>
  );
};

export default Home;
