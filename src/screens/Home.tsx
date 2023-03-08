interface IHomeProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({ setIsLoggedIn }: IHomeProps) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>Log out now!</button>
    </div>
  );
};

export default Home;
