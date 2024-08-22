import {
  ArrowLeftCircleIcon,
  CheckCircle2,
  CheckCircleIcon,
  Loader2Icon,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function MessageDetails() {
  const { message_id } = useParams();
  const navigate = useNavigate();

  const [messageInfo, setMessageInfo] = useState(null); // Object to hold the message details
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_MESSAGES_DATA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_id,
      }),
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
          setMessageInfo(data[0]); // Assuming the first item is the correct one
        } else {
          setMessageInfo(null); // No message found
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [message_id]);

  // Function to delete the message
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_MESSAGES_DATA}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_id,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the message");
        }
        // Redirect or show a success message
        // console.log("Message deleted successfully");
        Swal.fire({
          title: "Success!",
          text: "Message deleted successfully",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/admin/messages");
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  // Function to mark as resolved
  const handleResolve = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_MESSAGES_DATA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_id,
        status: 1,
        action: "update_status",
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the status");
        }
        setMessageInfo((prev) => ({ ...prev, status: "1" }));
        Swal.fire({
          title: "Success!",
          text: "Message status updated successfully",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/admin/messages");
      })
      .catch((error) => {
        // console.error("Error updating status:", error);
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <section className="mx-auto mb-[14rem] px-5 md:px-8">
      <div className="mx-auto">
        <h1 className="flex items-center gap-4 text-2xl font-semibold tracking-tight text-gray-800 mb-6">
          <Link to={`/admin/messages`}>
            <ArrowLeftCircleIcon size={25} />
          </Link>
          Message Details
        </h1>

        {error && (
          <div className="flex items-center justify-center font-medium py-5">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {/* FIRST GRID */}
          <div className="lg:col-span-2">
            {/* DELIVERY DETAILS */}
            <div className="flow-root bg-white py-10 px-6 rounded-lg mt-10">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Message Info
              </h1>
              <hr className="border-gray-100 my-5" />
              {messageInfo ? (
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Name</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {messageInfo.name}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Email</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {messageInfo.email}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Phone</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {messageInfo.phone}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Status</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {messageInfo.status === "0" ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                          <Loader2Icon size={10} className="mr-1" />
                          <p className="whitespace-nowrap text-sm">Pending</p>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                          <CheckCircle2 size={10} className="mr-1" />
                          <p className="whitespace-nowrap text-sm">Resolved</p>
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Message</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {messageInfo.message}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Date</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {messageInfo.date}
                    </dd>
                  </div>
                </dl>
              ) : (
                <div className="flex items-center justify-center font-medium">
                  Loading...
                </div>
              )}
            </div>
          </div>

          {/* SECOND GRID */}
          <div className="mt-10 h-[16rem] rounded-lg bg-white">
            {/*   Manage Message */}
            <div className="mt-5 px-8 bg-white rounded-lg py-6">
              <h1 className="text-[18px] font-semibold tracking-wider">
                Manage Message
              </h1>
              <hr className="border-gray-100 my-4" />
              <form>
                <div className="mt-14 flex gap-5">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-md border bg-red-600 text-center py-3 text-sm text-gray-100 transition hover:opacity-80 w-full flex items-center justify-center gap-2"
                    // disabled
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleResolve}
                    className="rounded-md bg-green-700 text-center py-3 text-sm text-gray-100 transition hover:opacity-80 w-full flex items-center justify-center gap-2"
                    // disabled
                  >
                    <CheckCircleIcon size={14} /> Mark as resolved
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageDetails;
