import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";
import Carousal from "../components/Carousal";
import { useAuth } from "../context/auth.jsx";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div>
        <Navtop title={"Mercado-Home Page"} />
        <MainNav />
        <Carousal />
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </>
  );
};

export default Home;
