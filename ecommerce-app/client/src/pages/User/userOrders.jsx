import {useState, useEffect} from 'react'
import Navtop from '../../components/Navtop'
import MainNav from '../../components/MainNav'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from "moment"

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
    <Navtop title={"User-Orders"} />
            <MainNav />
            <UserMenu />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
                    <h1 className='text-2xl'>User - Orders </h1>
                    <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="">
                  <table className="">
                    <thead>
                      <tr>
                        <th scope="">#</th>
                        <th scope="">Status</th>
                        <th scope="">Buyer</th>
                        <th scope=""> date</th>
                        <th scope="">Payment</th>
                        <th scope="">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className='' >
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
                </div>
            </div>
    </>
  )
}

export default UserOrders