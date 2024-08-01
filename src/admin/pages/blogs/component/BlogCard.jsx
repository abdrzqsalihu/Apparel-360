import { EditIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function BlogCard() {
  return (
    <div className="mx-auto mt-5">
      {/* {error && (
      <div className="flex items-center justify-center font-medium py-5">
        {error}
      </div>
    )} */}
      {/* {ProductDetails.map((item, idx) => ( */}
      <div
        // key={idx}
        className="flex flex-col items-center justify-center mb-6 rounded-md bg-white p-4"
      >
        <li className="w-[100%] flex flex-wrap items-center gap-4">
          <div className="flex flex-row items-center justify-between gap-4 flex-grow">
            <div className="flex flex-row items-center">
              <img
                src={`/products/product_1.png`}
                // alt={cartinfo.productimage}
                className="w-20 h-24 md:h-24 rounded-md object-cover mr-4"
              />

              <div className="flex flex-col w-full lg:w-[65rem]">
                <h3 className="text-sm text-gray-900 font-medium  tracking-tight line-clamp-1">
                  Blog Title
                </h3>
                <dl className="mt-1 space-y-px text-[11px] text-gray-600">
                  <div>
                    <dt className="inline font-medium">Date:</dt>
                    <dd className="inline ml-2">2024-07-31</dd>
                  </div>
                  <div className="line-clamp-2">
                    <dt className="font-medium inline">Content:</dt>
                    <dd className="ml-2 inline">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Ducimus perferendis cupiditate, esse aliquid voluptate
                      possimus eveniet mollitia sint pariatur vel, fugiat unde
                      sunt placeat illo, doloremque error vero facere id!
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                <Link
                  to={``}
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-800 hover:text-gray-700 focus:relative"
                >
                  <EditIcon size={17} />
                  Edit
                </Link>

                <Link
                  to={``}
                  className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                >
                  <Trash2 size={17} />
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </li>
      </div>
      {/* ))} */}
    </div>
  );
}

export default BlogCard;
