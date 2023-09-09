import AdminMenu from "../../components/AdminMenu";
import MainNav from "../../components/MainNav";
import Navtop from "../../components/Navtop";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";

const Orders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  //const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navtop title={"dashboard - Orders"} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64 font-fontApp">
        <div className="grid grid-cols-1 w-full grid-flow-row text-center p-2 rounded-lg border-dashed border-2 border-[#164990] h-[80vh] overflow-hidden">
          <h1 className="text-4xl text-white font-semibold p-4 rounded-md bg-gradient-to-r from-[#164990] to-[#77AEDE]">
            ORDERS
          </h1>
          <div className="">
            <div className="overflow-x-auto h-[65vh] mt-2">
              <table className="table table-sm table-pin-rows ">
                <thead className="text-lg sticky top-0 ">
                  <tr className="bg-[#164990] text-white text-center">
                    <th className="font-medium ">S#</th>
                    <th className="font-medium ">Status</th>
                    <th className="font-medium ">Buyer</th>
                    <th className="font-medium ">Date</th>
                    <th className="font-medium ">Payment</th>
                    <th className="font-medium ">Quantity</th>
                    <th className="font-medium ">Product</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((o, i) => (
                    <tr key={o._id} className="border-2 border-gray-300">
                      <td className="text-center">{i + 1}.</td>
                      <td>
                        <select
                          className="select select-bordered select-sm w-full max-w-xs  focus:outline-none"
                          onChange={(e) => handleChange(o._id, e.target.value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <option key={i} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-center">{o?.buyer?.name}</td>
                      <td className="text-center">
                        {moment(o?.createAt).calendar()}
                      </td>
                      <td className="text-center">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className="text-center">{o?.products?.length}</td>
                      <td>
                        <div className="text-md">
                          {o?.products?.map((p) => (
                            <div
                              className="flex items-center gap-2 justify-center"
                              key={p._id}
                            >
                              <div className="">
                                <img
                                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                  className="card-img-top w-24 h-24"
                                  alt={p.name}
                                />
                              </div>
                              <div className="">
                                <p>{p.name}</p>
                                <p>{p.description.substring(0, 30)}</p>
                                <p>Price : {p.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
