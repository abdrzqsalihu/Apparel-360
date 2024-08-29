import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_GET_BLOG_DATA)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllBlogs(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const stripHtmlTags = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value.replace(/<[^>]*>/g, ""); // Remove HTML tags
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to determine grid class based on the index
  const getGridClass = (index) => {
    // For simplicity, assume you want the first 2 items to be half-width
    // and the third item to be full-width, repeating this pattern
    return index % 3 === 2 ? "col-span-2" : "col-span-1";
  };

  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">All Blogs</h1>
            </div>
          </div>

          <div
            className={`grid gap-y-14 mt-10 ${
              allBlogs.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {allBlogs.map((blog, index) => (
              <div className={`md:pr-7  ${getGridClass(index)}`} key={blog.id}>
                <article className="flex bg-white transition hover:shadow-xl">
                  <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                    <time
                      dateTime={blog.date}
                      className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                    >
                      <span>{new Date(blog.date).getFullYear()}</span>
                      <span className="w-px flex-1 bg-gray-900/10"></span>
                      <span>
                        {new Date(blog.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </time>
                  </div>

                  <div className="hidden sm:block sm:basis-56">
                    <img
                      alt={blog.title}
                      src={
                        blog.cover_img
                          ? `blogscover/${blog.cover_img}`
                          : "https://via.placeholder.com/150"
                      }
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                      <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                          {blog.title}
                        </h3>
                      </a>

                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        {stripHtmlTags(blog.content)}
                      </p>
                    </div>

                    <div className="sm:flex sm:items-end sm:justify-end">
                      <Link
                        to={`${blog.id}`}
                        className="block bg-gray-700 px-5 py-3 text-center text-xs font-bold uppercase text-white hover:text-gray-200 transition hover:bg-gray-600"
                      >
                        Read Blog
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blogs;
