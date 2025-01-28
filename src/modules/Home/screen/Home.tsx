import HomeComponentService from './index.service';
import HomeComponent from '.';

const Home = (props: any) => {
  return (
    <HomeComponentService {...props}>
      {(props: any) => <HomeComponent {...props} />}
    </HomeComponentService>
  );
};

export default Home;
