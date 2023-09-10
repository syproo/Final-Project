import React, { useState, useEffect } from 'react'
import Navtop from '../components/Navtop'
import MainNav from '../components/MainNav'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import emptyCart from "../../public/images/emptyCart.png"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"

// code for modal
import { Modal } from "antd"
import AddressInput from '../components/forms/AddresInput'
import Footer from '../components/Footer'

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  // code for modal
  const [visible, setVisible] = useState(false);

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

  //   // Function to decrease the quantity of a product
  const changeItemQuantity = (productId, change) => {
    // Find the product in the cart
    const productIndex = cart.findIndex((item) => item._id === productId);

    if (productIndex !== -1) {
      // If the product exists in the cart
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity += change;

      if (updatedCart[productIndex].quantity <= 0) {
        // Remove the product from the cart if quantity is less than or equal to 0
        updatedCart.splice(productIndex, 1);
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("pak-Urdu", {
      style: "currency",
      currency: "PKR",
    });
  };


  return (
    <div className='font-fontApp '>
      <Navtop title={"Mercado - Cart"} />
      <MainNav />
      <div className='h-full'>
        <div className=''>
          <h1 className='text-center text-base md:text-2xl p-4 text-bold'>
            {!auth?.user
              ?
              (
                <div className='flex justify-center gap-3'>
                  <p className='border text-bold border-blue rounded-lg bg-[#164990]  text-white p-2  shadow-lg shadow-blue-600' >
                    Hello Guest !!
                  </p>
                  <img className=' w-[45px] ' src="https://th.bing.com/th/id/OIP.3L00mtkmeBhyXTtqn6A8dQHaHa?pid=ImgDet&rs=1" alt="" />
                </div>
              )
              : (
                <div className='flex justify-center gap-3  '>
                  <p className='border text-bold border-blue rounded-lg bg-[#164990]    text-white p-2  shadow-lg shadow-blue-600' >
                    {`Hello  ${auth?.token && auth?.user?.name} `}
                  </p>
                  <img
                    className=' w-[45px] '
                    src="https://th.bing.com/th/id/OIP.3L00mtkmeBhyXTtqn6A8dQHaHa?pid=ImgDet&rs=1"
                  />
                </div>
              )
            }
          </h1>
          <h4 className='text-center md:text-2xl p-3 text-bold' >
            {cart?.length
              ? (
                <>
                  <div className=' flex justify-center gap-4'>
                    <p className='border  border-slate rounded-lg bg-slate-100  p-2  shadow-lg shadow-gray-500'>
                      {`You Have ${cart.length} items in your cart  ${auth?.token ? "" : "please login to checkout !"}`}
                    </p>
                    <img
                      className='w-[50px] '
                      src="https://images.designtrends.com/wp-content/uploads/2015/11/27105901/Shopping-Cart-Icons31.png" />
                  </div>
                  {/*  code for Cart itmes*/}
                  <div className='   md:flex md:justify-around mt-7'>
                    <div className=' mt-5 p-4 m-4 w-100  flex flex-col gap-8 md:gap-3 ' >
                      {
                        cart?.map(p => (
                          <div className='  p-3 rounded-lg  md:flex md:justify-between   md:m-5 md:p-5   shadow-xl shadow-gray-500' >
                            <div className=' p-2 md:ps-5 md:pe-5 '>
                              <img
                                className="object-fit relative left-[50px]  md:relative md:left-2 w-[150px] h-[120px] md:w-40 md:h-40  rounded-lg transition duration-500 ease-in-out hover:scale-105"
                                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                alt={p.name}
                              />
                            </div>
                            <div className=' p-2 w-[270px] md:w-[400px] place-content-center   md:p-5 flex gap-2 md:gap-8 text-base md:text-[18px] bg-[#164990]   text-white rounded-lg  border-white'>
                              <div className=' text-sm md:text-base '>
                                <div className='flex gap-1 md:gap-4 p-1'>
                                  <h1 className='underline decoration-solid text-'> Name :</h1>
                                  <p>{p.name}</p>
                                </div>
                                <div className='flex gap-1 md:gap-4 p-1' >
                                  <h1 className='underline decoration-solid text-'> Description: </h1>
                                  <p>{p.description.substring(0, 30)}</p>
                                </div>
                                <div className='flex  gap-1 md:gap-4 p-1' >
                                  <h1 className='underline decoration-solid text-'>Price:</h1>
                                  <p>{p.price}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCartItem(p._id)}
                                  className="  m-2 inline-block rounded bg-neutral-50 px-2 md:px-6 pb-2 pt-2.5 text-[12px] md:text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
                                  Remove Item
                                </button>
                              </div>
                              <div className='flex flex-col gap-2'>
                                <div>
                                  <h1 className='underline decoration-solid text-sm md:text-base'> Quantity :</h1>
                                </div>
                                <div className='flex text-xl md:text-2xl'>
                                  <AiOutlineMinusCircle
                                    onClick={() => changeItemQuantity(p._id, -1)}
                                    disabled={p.quantity < 1}
                                  />
                                  <span
                                    className='w-10 text-center text-bold text-sm md:text-xl'>
                                    {p.quantity}
                                  </span>
                                  <AiOutlinePlusCircle
                                    onClick={() => changeItemQuantity(p._id, 1)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className=' relative left-5 p-5 mt-5  md:mt-20 w-80 md:w-[350px] md:h-[250px] text center rounded-lg border border-black shadow-lg shadow-black'>
                      <div className='flex text-base flex-col gap-8'>
                        <h1
                          className='text-xl sm:w-40 md:w-80 border text-bold border-blue rounded-lg bg-[#164990]   text-white p-2  shadow-lg shadow-blue-600'>
                          Cart Summary
                        </h1>
                        <div className='flex  justify-around'>
                          <h1
                            className=' sm:w-40 md:w-20 border text-bold border-blue rounded-lg bg-black text-white p-2  shadow-lg shadow-gray-600' >
                            Total:
                          </h1>
                          <h1
                            className='border sm:w-60 md:w-40 border-slate rounded-lg bg-slate-100  p-2  shadow-lg shadow-gray-500'>
                            {calculateTotalPrice()}
                          </h1>
                        </div>
                      </div>
                      <div className='p-5'>
                        {/* code for Checkout */}
                        {auth?.token ? (
                          <button
                            className='text-base sm:w-60 md:w-60 border text-bold border-blue rounded-lg bg-[#164990]    text-white p-2  shadow-lg shadow-blue-600'
                            onClick={() => {
                              setVisible(true);
                            }}
                          >
                            Click to checkout !!
                          </button>
                        ) : (
                          <button
                          className='text-base sm:w-60 md:w-60 border text-bold border-blue rounded-lg bg-[#164990]    text-white p-2  shadow-lg shadow-blue-600'
                            onClick={() =>
                              navigate("/login", {
                                state: "/cart",
                              })
                            }
                          >
                            Click to Login for checkout 
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* end */}
                </>
              )
              :
              (
                <div className='h-80' >
                  <p className='p-5' >Your Cart Is Empty</p>
                  <img
                    className=' relative top-[20px] left-20 xl:left-[600px] lg:left-[380px] md:left-[280px] w-[250px] '
                    src={emptyCart}
                    alt="empty"
                  />
                </div>
              )}
          </h4>
        </div>
      </div>
      <Footer />
      {/* modal */}
      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <AddressInput />
      </Modal>
    </div>
  );
};

export default CartPage;
