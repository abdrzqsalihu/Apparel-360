import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function UsersTable() {
  const [adminDetails, setAdminDetails] = useState([]);
  const [error, setError] = useState(null);

  // GET ADMIN INFO
  useEffect(() => {
    // Fetch user details from API endpoint
    fetch(import.meta.env.VITE_REACT_APP_GET_ALL_ADMIN_USERS_DATA, {
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
          setAdminDetails(data);
          // console.log(data);
        } else {
          setAdminDetails([]); // Set to an empty array if no data is returned
        }
        // console.log("Fetched user data:", data);
      })
      .catch((error) => {
        // console.error("Error fetching user order data:", error);
        setError(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(import.meta.env.VITE_REACT_APP_DELETE_ADMIN_DATA, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
                confirmButtonColor: "#374151",
                confirmButtonText: "Close",
              });
              // Update state to remove the deleted admin from the table
              setAdminDetails((prevDetails) =>
                prevDetails.filter((admin) => admin.id !== id)
              );
            } else {
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
            console.error("Error deleting account:", error);
            Swal.fire({
              title: "Error!",
              text: "Error deleting user.",
              icon: "error",
              confirmButtonColor: "#374151",
              confirmButtonText: "Close",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="mx-auto px-4 md:px-8">
        {error && (
          <div className="flex items-center justify-center font-medium py-5">
            {error}
          </div>
        )}

        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-white bg-gray-800 font-medium border-b">
              <tr>
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Date Added</th>
                <th className="py-3 px-6 pl-0"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y ">
              {adminDetails.map((item, idx) => (
                <tr
                  key={idx}
                  className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 text-xs"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center rounded-full bg-amber-200 px-2.5 py-0.5 text-amber-800">
                      <p className="whitespace-nowrap text-xs font-medium">
                        {item.role}
                      </p>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.date_created}
                  </td>
                  <td className="text-right px-6 pl-0 whitespace-nowrap">
                    <Link
                      to={`edit/${item.id}`}
                      className="py-1 leading-none px-4 mr-10 font-medium hover:bg-gray-800 text-gray-800 text-xs border border-gray-800 hover:text-white duration-150  rounded-lg"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="py-2 leading-none px-3 mr-10 font-medium bg-red-600 text-white text-xs hover:border border-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
