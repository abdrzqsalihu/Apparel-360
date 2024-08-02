import { ArrowLeftCircleIcon, UploadCloudIcon } from "lucide-react";
import { Link } from "react-router-dom";
import QuillEditor from "../../components/QuillEditor";

function AddBlog() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="flex items-center gap-4 text-2xl font-semibold tracking-tight text-gray-800">
          {" "}
          <Link to={`/admin/products`}>
            <ArrowLeftCircleIcon size={25} />
          </Link>{" "}
          Add New Blog
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <main className="mx-auto rounded-xl px-6 bg-white">
            <div className="py-12 px-4 text-gray-600">
              <div>
                <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight">
                  General Information
                </h1>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5 mt-5"
              >
                <div>
                  <label className="font-medium text-xs">Blog Title</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="font-medium text-xs">Blog Content</label>
                  {/* <textarea
                    required
                    className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none outline-none border focus:border-gray-800 bg-gray-100 shadow-sm rounded-lg"
                  ></textarea> */}

                  <QuillEditor />
                </div>
                <div>
                  <label className="font-medium text-xs">
                    Promotional Link (optional)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                  />
                </div>
              </form>
            </div>
          </main>
        </div>
        <div>
          <div className="h-[27rem] rounded-xl p-8 bg-white">
            <h1 className="text-gray-800 text-[1.1rem] mt-3 font-semibold tracking-tight">
              Upload Cover Image
            </h1>
            <div className="h-[16rem] mt-12 rounded-lg border border-gray-500 border-dashed flex items-center justify-center bg-gray-100">
              <label
                htmlFor="file"
                className="cursor-pointer text-center p-4 md:p-8 flex flex-col items-center"
              >
                <UploadCloudIcon size={55} className="text-gray-800" />
                <p className="mt-3 text-gray-500 max-w-xs mx-auto text-sm">
                  Click to Upload the image file
                </p>
              </label>
              <input id="file" type="file" className="hidden" />
            </div>
          </div>

          <div className="mt-16">
            <button
              type="submit"
              className="block rounded-md font-medium bg-gray-800 text-center py-3 text-sm text-gray-100 transition hover:opacity-90 w-[98%] mx-auto"
            >
              Add Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
