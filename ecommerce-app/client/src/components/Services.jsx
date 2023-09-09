const Services = () => {
  return (
    <div className="w-full mx-auto p-6 h-auto font-fontApp  container">
      <div className=" flex flex-col md:grid md:grid-cols-4 justify-items-center p-2 md:space-y-2">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="grid p-4 rounded-lg place-items-center"
        >
          <img
            className="object-fit w-20 h-20  transition duration-300 ease-in-out hover:scale-105"
            src="images/fast-delivery.png"
            alt=""
          />
          <p className="text-lg font-semibold text-center">Fast Shipping</p>
          <p className="text-sm">Same Day in Karachi</p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="grid justify-items-center  p-4 rounded-lg"
        >
          <img
            className="object-fit w-20 h-20 rounded-lg transition duration-300 ease-in-out hover:scale-105"
            src="images/cash-on-delivery.png"
            alt=""
          />
          <p className="text-lg font-semibold">Cash On Delivery</p>
          <p className="text-sm">Secure Payments</p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="grid justify-items-center  p-4 rounded-lg"
        >
          <img
            className="object-fit w-20 h-20 rounded-lg transition duration-300 ease-in-out hover:scale-105"
            src="images/free-returns.png"
            alt=""
          />
          <p className="text-lg font-semibold">Free Returns</p>
          <p className="text-sm">If goods have problem</p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="grid justify-items-center  p-4 rounded-lg"
        >
          <img
            className="object-fit w-20 h-20 rounded-lg transition duration-300 ease-in-out hover:scale-105"
            src="images/customer-support.png"
            alt=""
          />
          <p className="text-lg font-semibold">Customer Support</p>
          <p className="text-sm">Dedicated Support</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
