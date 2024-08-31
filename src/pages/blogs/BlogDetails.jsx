import { ArrowLeftCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";

function BlogDetails() {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [error, setError] = useState(null);

  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    // Fetch product details from API endpoint
    fetch(`${import.meta.env.VITE_REACT_APP_GET_BLOG_DATA}?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setBlogDetail(data[0]);
        } else {
          setBlogDetail(null);
        }
        // console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  return (
    <div>
      <section className="mt-6">
        <div className="mx-4 lg:mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold flex gap-4 items-center">
                {" "}
                <Link to={`/blog`}>
                  <ArrowLeftCircleIcon size={25} />
                </Link>{" "}
                Blog Details
              </h1>
            </div>
          </div>

          {error && <div>{error}</div>}

          {blogDetail ? (
            <>
              <div className={`grid gap-y-14 mt-10 grid-cols-1`}>
                <div className={`md:pr-7 `} key={blogDetail.id}>
                  <article className="flex bg-white transition">
                    <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                      <time
                        dateTime={blogDetail.date}
                        className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                      >
                        <span>{new Date(blogDetail.date).getFullYear()}</span>
                        <span className="w-px flex-1 bg-gray-900/10"></span>
                        <span>
                          {new Date(blogDetail.date).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </time>
                    </div>

                    <div className="hidden sm:block sm:basis-[19rem]">
                      <img
                        alt={blogDetail.title}
                        src={
                          blogDetail.cover_img
                            ? `/blogscover/${blogDetail.cover_img}`
                            : "https://via.placeholder.com/150"
                        }
                        className="aspect-square h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                        <a href="#">
                          <h3 className="font-bold text-xl uppercase text-gray-900">
                            {blogDetail.title}
                          </h3>
                        </a>

                        <div
                          className="ql-editor mt-5 text-sm/relaxed text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: decodeHTML(blogDetail.content),
                          }}
                        />

                        {blogDetail.product_link && (
                          <div className="mt-[-1.9rem]">
                            <Link
                              to={blogDetail.product_link}
                              className="underline text-sm font-medium tracking-widest"
                            >
                              View
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
                {/* ))} */}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center font-medium">
              Loading...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogDetails;
