import { EditIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function BlogCard() {
  const [blogDetails, setBlogDetails] = useState([]);
  const [error, setError] = useState(null);

  const stripHtmlTags = (html) => {
    // Create a temporary DOM element to decode HTML entities
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    const decodedHtml = txt.value;

    // Remove HTML tags using regex
    const text = decodedHtml.replace(/<[^>]*>/g, ""); // Regex to remove all HTML tags
    return text;
  };

  // GET ALL BLOGS INFO
  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_BLOGS_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogDetails(data);
        } else {
          setBlogDetails([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs data:", error);
        setError("Error fetching blog details.");
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
        fetch(import.meta.env.VITE_REACT_APP_ADMIN_MANAGE_BLOG, {
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
              setBlogDetails(blogDetails.filter((blog) => blog.id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Blog has been deleted.",
                icon: "success",
                confirmButtonColor: "#374151",
                confirmButtonText: "Close",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: data.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting blog:", error);
            Swal.fire({
              title: "Error!",
              text: "Error deleting blog.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="mx-auto mt-5">
      {error && (
        <div className="flex items-center justify-center font-medium py-5">
          {error}
        </div>
      )}
      {blogDetails.length === 0 ? (
        <div className="flex items-center justify-center font-medium py-5">
          No blogs found.
        </div>
      ) : (
        blogDetails.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center mb-6 rounded-md bg-white p-4"
          >
            <li className="w-[100%] flex flex-wrap items-center gap-4">
              <div className="flex flex-row items-center justify-between gap-4 flex-grow">
                <div className="flex flex-row items-center">
                  <img
                    src={`/blogscover/${item.cover_img}`}
                    alt={item.title}
                    className="w-20 h-24 md:h-24 rounded-md object-cover mr-4"
                  />
                  <div className="flex flex-col w-full lg:w-[65rem]">
                    <h3 className="text-sm text-gray-900 font-medium tracking-tight line-clamp-1">
                      {item.title}
                    </h3>
                    <dl className="mt-1 space-y-px text-[11px] text-gray-600">
                      <div>
                        <dt className="inline font-medium">Date:</dt>
                        <dd className="inline ml-2">{item.date}</dd>
                      </div>
                      <div className="line-clamp-2">
                        <dt className="font-medium inline">Content:</dt>
                        <dd className="ml-2 inline">
                          {stripHtmlTags(item.content)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div>
                  <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <Link
                      to={`/admin/blogs/edit/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-800 hover:text-gray-700 focus:relative"
                    >
                      <EditIcon size={17} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogCard;
