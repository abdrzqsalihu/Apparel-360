import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Checkout() {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [allDeliveryLocation, setAllDeliveryLocation] = useState([]);
  const [error, setError] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    apartment: "",
    message: "",
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_GET_DELIVERY_LOCATION_DATA)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllDeliveryLocation(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleLocationChange = (event) => {
    const selectedLocation = allDeliveryLocation.find(
      (location) => location.name === event.target.value
    );
    setSelectedLocation(selectedLocation);
    // setDeliveryPrice(selectedLocation ? selectedLocation.price : 0);
    setDeliveryPrice(selectedLocation ? parseFloat(selectedLocation.price) : 0);
  };

  const parsedTotalPrice = parseFloat(totalPrice);
  const total = parsedTotalPrice + deliveryPrice;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedTotalPrice = parseFloat(totalPrice);
    const total = parsedTotalPrice + deliveryPrice;

    const orderData = {
      ...formData,
      deliveryPrice,
      totalPrice: total,
      deliveryLocation: selectedLocation?.name || "",
    };

    fetch(import.meta.env.VITE_REACT_APP_SAVE_DELIVERY_ORDER_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      credentials: "include", // To include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // alert("Order placed successfully!");
          Swal.fire({
            title: "Success!",
            text: "Order placed successfully!",
            icon: "success",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });
          // Redirect or update UI as needed
        } else {
          // alert("Error placing order: " + data.message);

          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Checkout</h1>
            </div>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
              <div className="flex flex-1 flex-col justify-center">
                <section className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className="w-full rounded-md border border-gray-200 p-3 text-sm"
                      placeholder="Full Name"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Email address"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Phone Number"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      name="deliveryLocation"
                      id="location"
                      defaultValue=""
                      onChange={handleLocationChange}
                      className="mt-1.5 w-full rounded-md border p-3 border-gray-200 text-gray-500 sm:text-sm"
                    >
                      <option value="" disabled>
                        Select delivery location
                      </option>
                      {allDeliveryLocation.map((location) => (
                        <option value={location.name} key={location.id}>
                          {location.name} : ₦{location.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="town">
                        Town / City
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Town / City"
                        type="text"
                        id="town"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="appartment">
                        Apartment, suite, unit etc: (optional)
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-200 p-3 text-sm"
                        placeholder="Apartment, suite, unit etc: (optional)"
                        type="text"
                        id="appartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="message">
                      Address
                    </label>

                    <textarea
                      className="w-full rounded-md border border-gray-200 p-3 text-sm"
                      placeholder="Address"
                      rows="8"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </section>
              </div>

              <div className="flex bg-gray-100 p-5 py-6 ml-0 lg:ml-10 mt-10 lg:mt-0 h-[19rem] w-full lg:w-[30%] rounded-md">
                <div className="flex flex-col w-[100%]">
                  <h1 className="text-[18px] font-semibold my-2 tracking-wider">
                    Order Total
                  </h1>
                  <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                    Subtotal: <span className="font-medium">₦{totalPrice}</span>
                  </p>
                  <p className="my-2 text-[15px] mb-3 tracking-tight flex justify-between">
                    Delivery:{" "}
                    <span className="font-medium">₦{deliveryPrice}.00</span>
                  </p>
                  <hr className="my-2" />
                  <p className="my-2 text-[16px] mb-3 font-medium tracking-tight flex justify-between">
                    Total: <span className="font-medium">₦{total}.00</span>
                  </p>

                  <div className="mt-4 w-full">
                    <button
                      type="submit"
                      className="block rounded bg-gray-700 text-center py-3 text-sm text-gray-100 transition hover:bg-gray-600 w-full"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
