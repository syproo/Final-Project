import React, { useState, useRef, useEffect } from "react";
import MainNav from "../components/MainNav";
import Carousal from "../components/Carousal";
import Navtop from "../components/Navtop";
import Footer from "../components/Footer";

const About = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      // Here you can add your subscription logic, such as sending the email to your backend
      // For now, let's just simulate the subscription
      console.log("Subscribed:", email);

      // Update the subscribed state
      setSubscribed(true);

      // Clear the email input
      setEmail("");
    }
  };

  const aboutImageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fadeIn");
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(aboutImageRef.current);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navtop title="Mercado-About Us" />
      <MainNav />
      <Carousal />
      <div className="bg-gray-100 p-8 flex items-center justify-center">
        <div className="aboutLeft w-1/2 ">
          <img
            src="/images/aboutUsImage.jpg"
            className="aboutImage w-full h-auto"
            ref={aboutImageRef}
            alt="About Us"
          />
        </div>
        <div className="aboutRight w-1/2 pl-8">
          <div className="text-3xl font-semibold text-center mb-4">About</div>
          <div className="text-gray-700 leading-loose mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
            <br />
            <br />
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
      <div className="bg-white p-2 mt-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl  font-semibold mb-2 underline ">
          Subscribe to newsletter
        </h2>
        <br />

        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded-l px-2 py-1 focus:outline-none hover:border-blue-500 hover:outline-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className={`bg-blue-500 text-white px-2 py-1 rounded-r hover:bg-blue-700 focus:outline-none ${
              subscribed ? "cursor-not-allowed bg-gray-400" : ""
            }`}
            onClick={subscribed ? null : handleSubscribe}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default About;
