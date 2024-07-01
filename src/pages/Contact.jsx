import { Mail } from "lucide-react";
import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(import.meta.env.VITE_REACT_APP_CONTACT_US, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert(
        "We've recieved your message and we'd get back to you in 24 hours!"
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      alert("Error sending message. Please try again.");
    }
  };
  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Contact Us</h1>
            </div>
          </div>

          <div className="mt-10">
            <section className="bg-gray-50">
              <div className="mx-auto max-w-screen-xl px-4 py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                  <div className="lg:col-span-2 lg:py-12">
                    <p className="max-w-xl text-[1rem] leading-7 md:text-lg">
                      We're here to help! If you have any questions, feedback,
                      or need assistance with your order, please don't hesitate
                      to reach out.
                    </p>

                    <div className="mt-8">
                      <a
                        href="#"
                        className="text-[1.2rem] md:text-[1.4rem] font-bold text-black flex gap-2 items-center"
                      >
                        <Mail /> hello@apparel.com
                      </a>

                      <address className="text-[1rem] mt-4 not-italic">
                        123 Fashion Street, Style City, NY 12345
                      </address>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="sr-only" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                          placeholder="Name"
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="sr-only" htmlFor="email">
                            Email
                          </label>
                          <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Email address"
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label className="sr-only" htmlFor="phone">
                            Phone
                          </label>
                          <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Phone Number"
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="message">
                          Message
                        </label>

                        <textarea
                          className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                          placeholder="Message"
                          rows="8"
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-block w-full rounded-lg bg-gray-700 hover:bg-gray-600 px-5 py-3 font-medium text-white sm:w-auto"
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
