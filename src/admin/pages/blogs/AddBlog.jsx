import { ArrowLeftCircleIcon, UploadCloudIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuillEditor from "../../components/QuillEditor";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function AddBlog() {
  const navigate = useNavigate();
  const { blogId } = useParams(); // Get blogId from URL if editing
  const [isEditing, setIsEditing] = useState(false);

  const [blogData, setBlogData] = useState({
    blogTitle: "",
    blogContent: "",
    promotionalLink: "",
    image: null,
    imagePreview: "", // State for image preview
  });

  useEffect(() => {
    if (blogId) {
      setIsEditing(true);
      fetch(`${import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_BLOGS_DATA}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId, action: "getBlogByID" }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setBlogData({
            blogTitle: data.title,
            blogContent: data.content,
            promotionalLink: data.product_link,
            imagePreview: data.cover_img ? `/blogscover/${data.cover_img}` : "",
          });
        })
        .catch((error) => console.error("Error fetching blog data:", error));
    }
  }, [blogId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBlogData((prevBlogData) => ({
      ...prevBlogData,
      [id]: value,
    }));
  };

  const handleContentChange = (content) => {
    setBlogData((prevBlogData) => ({
      ...prevBlogData,
      blogContent: content,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData((prevBlogData) => ({
          ...prevBlogData,
          image: file,
          imagePreview: reader.result, // Set the image preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("blog_title", blogData.blogTitle);
    submissionData.append("blog_content", blogData.blogContent);
    submissionData.append("promotional_link", blogData.promotionalLink);
    if (blogData.image) {
      submissionData.append("image", blogData.image);
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_ADMIN_ADD_NEW_BLOG,
        {
          method: "POST",
          body: submissionData,
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Blog added successfully",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/admin/blogs");

        setBlogData({
          blogTitle: "",
          blogContent: "",
          promotionalLink: "",
          image: null,
          imagePreview: "", // Reset image preview
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Error! Please try again.",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("blog_title", blogData.blogTitle);
    submissionData.append("blog_content", blogData.blogContent);
    submissionData.append("promotional_link", blogData.promotionalLink);
    if (blogData.image) {
      submissionData.append("image", blogData.image);
    }
    submissionData.append("editid", blogId);

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_ADMIN_UPDATE_BLOG,
        {
          method: "POST",
          body: submissionData,
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Blog updated successfully",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/admin/blogs");

        setBlogData({
          blogTitle: "",
          blogContent: "",
          promotionalLink: "",
          image: null,
          imagePreview: "", // Reset image preview
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Error! Please try again.",
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#374151",
        confirmButtonText: "Close",
      });
    }
  };

  const handleSubmit = (e) => {
    if (isEditing) {
      handleUpdateSubmit(e);
    } else {
      handleAddSubmit(e);
    }
  };

  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="flex items-center gap-4 text-2xl font-semibold tracking-tight text-gray-800">
          <Link to={`/admin/blogs`}>
            <ArrowLeftCircleIcon size={25} />
          </Link>
          {isEditing ? "Edit Blog" : "Add New Blog"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <main className="mx-auto rounded-xl px-6 bg-white">
              <div className="py-12 px-4 text-gray-600">
                <div>
                  <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight">
                    General Information
                  </h1>
                </div>
                <div className="space-y-5 mt-5">
                  <div>
                    <label className="font-medium text-xs">Blog Title</label>
                    <input
                      type="text"
                      required
                      id="blogTitle"
                      value={blogData.blogTitle}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-xs">Blog Content</label>
                    <QuillEditor
                      value={blogData.blogContent}
                      onChange={handleContentChange}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-xs">
                      Promotional Link (optional)
                    </label>
                    <input
                      type="text"
                      id="promotionalLink"
                      value={blogData.promotionalLink}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
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
                  htmlFor="image"
                  className="cursor-pointer text-center p-4 md:p-8 flex flex-col items-center"
                >
                  {blogData.imagePreview ? (
                    <>
                      <img
                        src={blogData.imagePreview}
                        alt="Image preview"
                        className="mt-2 w-[15rem] h-[11rem] object-cover rounded-md"
                      />
                      <p className="mt-3 text-gray-500 text-sm">
                        Click to replace the image file
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadCloudIcon size={50} className="text-gray-800" />
                      <p className="mt-3 text-gray-500 text-sm">
                        Click to upload the image file
                      </p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </div>
            </div>

            <div className="mt-16">
              <button
                type="submit"
                className="block rounded-md font-medium bg-gray-800 text-center py-3 text-sm text-gray-100 transition hover:opacity-90 w-[98%] mx-auto"
              >
                {isEditing ? "Update Blog" : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
