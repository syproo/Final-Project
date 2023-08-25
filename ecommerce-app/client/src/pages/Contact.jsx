import React, { useState } from "react";
import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";
import Carousal from "../components/Carousal";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (
      formData.name &&
      formData.email &&
      formData.whatsapp &&
      formData.message
    ) {
      // Simulate sending form data to the backend
      console.log("Form data submitted:", formData);

      // Clear form fields
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        message: "",
      });

      // Display submit message
      setSubmitMessage(
        "Thanks for your message! We will get back to you soon."
      );
    } else {
      setSubmitMessage("Please fill in all required fields.");
    }
  };

  const handleClearAll = () => {
    // Clear form fields
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      message: "",
    });

    // Clear submit message
    setSubmitMessage("");
  };

  return (
    <div>
      <Navtop title={"Mercado-Contact Us"} />
      <MainNav />
      <Carousal />
      <div className="container-box flex justify-center items-center p-4 ">
        <div className="w-full max-w-md ">
          <h1 className="text-3xl font-semibold text-center mb-4 ">
            Contact Us
          </h1>
          <div className="container-form ">
            <div className="rounded-lg bg-blue-100 shadow p-4">
              <form name="contact_form" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    className="input-field p-2 border rounded w-full"
                    name="name"
                    placeholder="Your Name"
                    title="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="input-field p-2 border rounded w-full"
                    name="email"
                    placeholder="Your Email Address"
                    title="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    className="input-field p-2 border rounded w-full"
                    name="whatsapp"
                    placeholder="Your WhatsApp Number"
                    title="Your WhatsApp Number"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    className="input-field p-2 border rounded w-full"
                    placeholder="Your Message"
                    title="Your Message"
                    style={{
                      maxWidth: 250,
                      maxHeight: 300,
                      height: 100,
                      minWidth: 415,
                    }}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4 flex justify-between">
                  <input
                    type="submit"
                    id="btn-submit"
                    className="input-field bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    name="submit"
                    value="Send Message"
                  />
                  <input
                    type="button"
                    id="btn-reset"
                    className="input-field bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                    name="reset"
                    value="Clear All"
                    onClick={handleClearAll}
                  />
                </div>

                {submitMessage && (
                  <p className="submit-message mt-4 text-green-600">
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
