import { EditIcon, Trash2 } from "lucide-react";

/* eslint-disable react/no-unescaped-entities */
function ProductCard() {
  return (
    <div className="mx-auto mt-5">
      <div className="flex flex-col items-center justify-center mb-6 rounded-md bg-white p-4">
        <li className="w-[100%] flex flex-wrap items-center gap-4">
          <div className="flex flex-row items-center justify-between gap-4 flex-grow">
            <div className="flex flex-row items-center">
              <img
                src={`/products/product_1.png`}
                // alt={cartinfo.productimage}
                className="w-24 h-24 md:h-28 rounded-md object-cover mr-4"
              />

              <div className="flex flex-col w-full lg:w-[65rem]">
                <h3 className="text-sm text-gray-900 font-semibold line-clamp-1">
                  Testing
                </h3>
                <dl className="mt-1 space-y-px text-[11px] text-gray-600">
                  <div>
                    <dt className="inline font-medium">Product Price:</dt>
                    <dd className="inline ml-2">₦20000.00</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium">Qty available:</dt>
                    <dd className="inline ml-2">100</dd>
                  </div>
                  <div className="flex items-start">
                    <dt className="font-medium">Product desc:</dt>
                    <dd className="line-clamp-1 ml-2 flex-1">
                      Crafted with a blend of warmth and style, the Phoenix
                      Fleece is a versatile addition to your wardrobe. Its soft
                      and cozy fleece fabric offers a perfect balance of comfort
                      and durability, making it ideal for cool days and relaxed
                      outings. With a modern, sporty design and the iconic Nike
                      Swoosh, this fleece adds a touch of urban flair to your
                      look. Whether you're hitting the gym or hanging out with
                      friends, the Nike Sportswear Phoenix Fleece keeps you both
                      cozy and stylish. Elevate your everyday wear with this
                      classic piece of Nike Sportswear.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-800 hover:text-gray-700 focus:relative">
                  <EditIcon size={17} />
                  Edit
                </button>

                <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm">
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default ProductCard;
