import { CheckCircle2, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderTable() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);

  // GET USER ORDER INFO
  useEffect(() => {
    // Fetch user order details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_ADMIN_GET_USER_ORDER_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   action: "order_details",
      // }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOrderDetails(data);
          console.log(data);
        } else {
          setOrderDetails([]); // Set to an empty array if no data is returned
        }
        // console.log("Fetched user data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user order data:", error);
        setError(error.message);
      });
  }, []);
  return (
    <div className="mx-auto bg-white rounded-md mt-4  ">
      {error && (
        <div className="flex items-center justify-center font-medium py-5">
          {error}
        </div>
      )}
      <div className="shadow-sm border rounded-lg overflow-x-auto max-h-[700px] overflow-y-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-800 text-gray-200 font-medium border-b">
            <tr className="divide-x divide-gray-600">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6 whitespace-nowrap">Date placed</th>

              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {orderDetails.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100 divide-x">
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.o_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.status === "0" ? (
                    <span className="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700">
                      <Loader2Icon size={10} className="mr-1" />

                      <span className="whitespace-nowrap text-xs">Pending</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                      <CheckCircle2 size={10} className="mr-1" />

                      <span className="whitespace-nowrap text-xs">
                        Confirmed
                      </span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <Link
                    to={`orderdetails/${item.id}`}
                    className="inline-block rounded border border-gray-900 px-3 py-2 text-xs font-medium text-gray-800 hover:text-white hover:bg-gray-800"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
