import UserMenu from '../../components/UserMenu';
import MainNav from './../../components/MainNav';
import Navtop from './../../components/Navtop';
import { useAuth } from '../../context/auth';

const Dashboard = () => {

  const [auth] = useAuth ( )

  return (
    <div>
       <Navtop title={"User-dashboard"} />
            <MainNav />
            <UserMenu />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
                    <h1 className='text-2xl'>User Name : {auth?.user?.name}</h1>
                    <h1 className='text-2xl'>User Email : {auth?.user?.email}</h1>
                </div>
            </div>
    </div>
  );
};

export default Dashboard;
