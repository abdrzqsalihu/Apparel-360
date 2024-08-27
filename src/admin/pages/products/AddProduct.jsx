import { ArrowLeftCircleIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AddProduct() {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get blogId from URL if editing
  console.log(productId);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    price: "",
    quantity: "",
    sizes: [],
    category: "",
    image: null,
    imagePreview: "", // State for image preview
  });

  useEffect(() => {
    if (productId) {
      setIsEditing(true);
      fetch(`${import.meta.env.VITE_REACT_APP_ADMIN_GET_ALL_PRODUCTS_DATA}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action: "getProductByID" }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setProductData({
            productName: data.productname,
            productDesc: data.productdesc,
            price: data.productprice,
            quantity: data.qty_available,
            sizes: Array.isArray(data.sizes)
              ? data.sizes
              : data.sizes.split(","), // Ensure it's an array
            category: data.category,
            imagePreview: data.productimage
              ? `/products/${data.productimage}`
              : "",
          });

          console.log(data);
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData((prevProductData) => ({
          ...prevProductData,
          image: file,
          imagePreview: reader.result, // Set the image preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setProductData((prevProductData) => {
      const newSizeArray = prevProductData.sizes.includes(value)
        ? prevProductData.sizes.filter((size) => size !== value)
        : [...prevProductData.sizes, value];

      return { ...prevProductData, sizes: newSizeArray };
    });
  };

  const handleCategoryChange = (e) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      category: e.target.value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("product_name", productData.productName);
    submissionData.append("product_desc", productData.productDesc);
    submissionData.append("price", productData.price);
    submissionData.append("quantity", productData.quantity);
    if (productData.sizes.length > 0) {
      submissionData.append("sizes", productData.sizes.join(","));
    }
    if (productData.category) {
      submissionData.append("category", productData.category);
    }
    if (productData.image) {
      submissionData.append("image", productData.image);
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_ADMIN_ADD_NEW_PRODUCT,
        {
          method: "POST",
          body: submissionData,
        }
      );

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        // Log the received data from the server
        // console.log("Received Data from Server:", result);

        if (result.success) {
          Swal.fire({
            title: "Success!",
            text: "Product added successfully",
            icon: "success",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });

          navigate("/admin/products");

          setProductData({
            productName: "",
            productDesc: "",
            price: "",
            quantity: "",
            sizes: [],
            category: "",
            image: null,
            imagePreview: "", // Reset image preview
          });
        } else {
          // alert(result.message || "Error! Please try again.");
          Swal.fire({
            title: "Error!",
            text: result.message || "Error! Please try again.",
            icon: "error",
            confirmButtonColor: "#374151",
            confirmButtonText: "Close",
          });
        }
      } else {
        // const text = await response.text();
        // alert(`Unexpected response format: ${text}`);
        Swal.fire({
          title: "Error!",
          text: `Something went wrong`,
          icon: "error",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      // alert(`There was an error submitting the form: ${error.message}`);
      // console.log(error.message);

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
    submissionData.append("product_name", productData.productName);
    submissionData.append("product_desc", productData.productDesc);
    submissionData.append("price", productData.price);
    submissionData.append("quantity", productData.quantity);
    if (productData.sizes.length > 0) {
      submissionData.append("sizes", productData.sizes.join(","));
    }
    if (productData.category) {
      submissionData.append("category", productData.category);
    }
    if (productData.image) {
      submissionData.append("image", productData.image);
    }
    submissionData.append("editid", productId);

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_ADMIN_UPDATE_PRODUCT,
        {
          method: "POST",
          body: submissionData,
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully",
          icon: "success",
          confirmButtonColor: "#374151",
          confirmButtonText: "Close",
        });

        navigate("/admin/products");

        setProductData({
          productName: "",
          productDesc: "",
          price: "",
          quantity: "",
          sizes: [],
          category: "",
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
          {" "}
          <Link to={`/admin/products`}>
            <ArrowLeftCircleIcon size={25} />
          </Link>{" "}
          {isEditing ? "Edit Product" : "Add New Product"}
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
                    <label className="font-medium text-xs">Product Name</label>
                    <input
                      type="text"
                      required
                      id="productName"
                      value={productData.productName}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-xs">
                      Product Description
                    </label>
                    <textarea
                      required
                      id="productDesc"
                      value={productData.productDesc}
                      onChange={handleChange}
                      className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none outline-none border focus:border-gray-800 bg-gray-100 shadow-sm rounded-lg"
                    ></textarea>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div>
                      <p className="font-medium text-xs">Size</p>
                      <span className="text-gray-500 text-xs">
                        Pick available size
                      </span>

                      <fieldset className="grid grid-cols-4 lg:grid-cols-6 mt-3 gap-3">
                        <legend className="sr-only">Sizes</legend>

                        {["XS", "S", "M", "L", "XL", "XXL"].map(
                          (size, index) => (
                            <div key={size}>
                              <label
                                htmlFor={`Size${size}`}
                                className="block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900 w-[3rem] h-[2.6rem]"
                              >
                                <div>
                                  <p
                                    className={`text-gray-900 ${
                                      index === 0 ? "-ml-1" : ""
                                    } ${
                                      ["XS", "XL", "XXL"].includes(size)
                                        ? "-ml-1"
                                        : ""
                                    } -mt-1`}
                                  >
                                    {size}
                                  </p>
                                </div>
                                <input
                                  type="checkbox"
                                  name="sizes"
                                  value={size}
                                  id={`Size${size}`}
                                  onChange={handleSizeChange}
                                  checked={productData.sizes.includes(size)}
                                  className="sr-only"
                                />
                              </label>
                            </div>
                          )
                        )}
                      </fieldset>
                    </div>

                    <div>
                      <p className="font-medium text-xs">Category</p>
                      <span className="text-gray-500 text-xs">
                        Pick product category
                      </span>
                      <fieldset className="grid lg:grid-cols-3 mt-3 gap-4">
                        <legend className="sr-only">Category</legend>
                        {["Men", "Women", "Unisex"].map((cat) => (
                          <div key={cat}>
                            <label
                              htmlFor={cat}
                              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-gray-900 has-[:checked]:ring-1 has-[:checked]:ring-gray-900"
                            >
                              <div>
                                <p className="text-gray-900">{cat}</p>
                              </div>

                              <input
                                type="radio"
                                name="category"
                                value={cat}
                                id={cat}
                                onChange={handleCategoryChange}
                                checked={productData.category === cat}
                                className="size-5 border-gray-300 text-gray-900"
                              />
                            </label>
                          </div>
                        ))}
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <main className="mt-10 mx-auto rounded-xl px-6 bg-white">
              <div className="py-12 px-4 text-gray-600">
                <div>
                  <h1 className="text-gray-800 text-[1.1rem] font-semibold tracking-tight">
                    Pricing and Stock
                  </h1>
                </div>
                <div className="space-y-5 mt-5">
                  <div className="flex items-center gap-5 justify-between">
                    <div className="w-full">
                      <label className="font-medium text-xs">
                        Product Price
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        id="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium text-xs">
                        Quantity Available
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        id="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 text-gray-500 outline-none border focus:border-gray-800 shadow-sm rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div>
            <div className="h-[27rem] rounded-xl p-8 bg-white">
              <h1 className="text-gray-800 text-[1.1rem] mt-3 font-semibold tracking-tight">
                Upload Product Image
              </h1>
              <div className="h-[16rem] mt-12 rounded-lg border border-gray-500 border-dashed flex items-center justify-center bg-gray-100">
                <label
                  htmlFor="image"
                  className="cursor-pointer text-center p-4 md:p-8 flex flex-col items-center"
                >
                  {/* Show icon or preview based on state */}
                  {productData.imagePreview ? (
                    <>
                      <img
                        src={productData.imagePreview}
                        alt="Image preview"
                        className="mt-2 w-[15rem] h-[11rem] object-cover rounded-md"
                      />
                      <p className="mt-3 text-gray-500 text-sm">
                        Click to replace the image file
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadCloudIcon size={75} className="text-gray-800" />
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
                  // accept="image/*" // Allow all image formats
                  onChange={handleFileChange}
                  className="hidden"
                  required={!isEditing} // Field is required only when not editing
                />
              </div>
            </div>

            <div className="mt-16">
              <button
                type="submit"
                className="block rounded-md font-medium bg-gray-800 text-center py-3 text-sm text-gray-100 transition hover:opacity-90 w-[98%] mx-auto"
              >
                {isEditing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
