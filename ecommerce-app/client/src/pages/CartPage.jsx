import React from 'react'
import Navtop from '../components/Navtop'
import MainNav from '../components/MainNav'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("pak-Urdu", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div className=''>
            <Navtop title={"Mercado - Cart"} />
            <MainNav />
            <div>
                <div>
                    <h1 className='text-center text-2xl p-4 text-bold'>
                        {!auth?.user
                            ? "Hello Guest !! "
                            : `Hello  ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center text-2xl p-3 text-bold' >
                        {cart?.length
                            ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                            }`
                            : " Your Cart Is Empty"}
                    </h4>
                </div>
            </div>
            <div className='flex  justify-around '>
                <div>
                    {
                        cart?.map(p => (
                            <div className='flex justify-between'>
                                <div className='ps-5 pe-5 '>
                                    <img
                                        className="object-fit w-96 h-80 rounded-lg transition duration-500 ease-in-out hover:scale-105"
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                        alt={p.name}
                                    />
                                </div>
                                <div className='ps-5 pe-5'>
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>{p.price}</p>
                                    <button
                                        type="button"
                                        onClick={() => removeCartItem(p._id)}
                                        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                        Remove Item
                                    </button>
                                </div>
                            </div>
                        ))

                    }
                </div>
                <div className='text center'>
                    <h1 className='text-2xl'>Cart Summary </h1>
                    <p>Total | Checkout | payment</p>
                    <hr />
                    <h1>Total: {totalPrice()}</h1>
                </div>
                <div>
                {auth?.token ? (
                    <button
                    class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Phone No
                    </button>
                  ) : (
                    <button
                    class="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
            </div>
            
        </div>
    )
}

export default CartPage