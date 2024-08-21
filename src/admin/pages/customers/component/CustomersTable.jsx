import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";

function CustomersTable() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // GET CUSTOMER INFO
  useEffect(() => {
    // Fetch user order details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_CUSTOMER_DETAILS_DATA, {
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
          setCustomerDetails(data);
          // console.log(data);
        } else {
          setCustomerDetails([]); // Set to an empty array if no data is returned
        }
        // console.log("Fetched user data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user order data:", error);
        setError(error.message);
      });
  }, []);

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customerDetails.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(customerDetails.length / itemsPerPage);

  return (
    <div>
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
                <th className="py-4 px-6 lg:pr-0 whitespace-nowrap">
                  Account created on
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {currentItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100 divide-x">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="pl-6 py-4 whitespace-nowrap">
                    {item.datecreated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CustomersTable;
