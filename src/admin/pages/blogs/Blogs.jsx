import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "./component/BlogCard";

function Blogs() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Blogs
        </h1>

        <Link
          to="/shop"
          className="rounded-lg bg-gray-800 text-center py-2 px-4 text-sm text-gray-100 font-light transition hover:bg-gray-700 flex items-center gap-1"
        >
          <Plus size={17} /> Add Blog
        </Link>
      </div>

      <BlogCard />
      {/* <Pagination /> */}
    </div>
  );
}

export default Blogs;
