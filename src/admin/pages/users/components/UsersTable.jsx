import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function UsersTable() {
  const tableItems = [
    {
      name: "Liam James",
      email: "liamjames@example.com",
      phone: "08085458630",
      role: "Super Admin",
      date: "2024-07-14",
    },
    {
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      phone: "09085428618",
      role: "Product Manager",
      date: "2024-08-10",
    },
  ];

  const [areAllChecked, setAllChecked] = useState(false);
  let [checkboxItems, setCheckboxItem] = useState({});

  // set or unset all checkbox items
  const handleCheckboxItems = () => {
    setAllChecked(!areAllChecked);
    tableItems.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = !areAllChecked;
      setCheckboxItem({ ...checkboxItems });
    });
  };

  // Update checked value
  const handleCheckboxChange = (e, idx) => {
    setAllChecked(false);
    setCheckboxItem({ ...checkboxItems, [`checkbox${idx}`]: e.target.checked });
  };

  useEffect(() => {
    // Set properties with false value
    tableItems.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = false;
      setCheckboxItem({ ...checkboxItems });
    });
  }, []);

  useEffect(() => {
    // Check if all checkbox items are checked and update setAllChecked state
    const checkboxItemsVal = Object.values(checkboxItems);
    const checkedItems = checkboxItemsVal.filter((item) => item == true);
    if (checkedItems.length == tableItems.length) setAllChecked(true);
  }, [checkboxItems, tableItems.length]);

  return (
    <div>
      <div className="mx-auto px-4 md:px-8">
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-white bg-gray-800 font-medium border-b">
              <tr>
                <th className="py-3 px-6 flex items-center gap-x-4">
                  <div>
                    <input
                      type="checkbox"
                      id="checkbox-all-items"
                      className="checkbox-item peer hidden"
                      checked={areAllChecked}
                      onChange={handleCheckboxItems}
                    />
                    <label
                      htmlFor="checkbox-all-items"
                      className="relative flex w-5 h-5 bg-white peer-checked:bg-gray-800 rounded-md border ring-offset-2 ring-gray-800 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                    ></label>
                  </div>
                  Name
                </th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Date Added</th>
                <th className="py-3 px-6 pl-0"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y ">
              {tableItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 text-xs"
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                    <div>
                      <input
                        type="checkbox"
                        id={`checkbox-${idx}`}
                        name={`checkbox-${idx}`}
                        className="checkbox-item peer hidden"
                        checked={checkboxItems[`checkbox${idx}`]}
                        onChange={(e) => handleCheckboxChange(e, idx)}
                      />
                      <label
                        htmlFor={`checkbox-${idx}`}
                        className="relative flex w-5 h-5 bg-white peer-checked:bg-gray-800 rounded-md border ring-offset-2 ring-gray-800 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                      ></label>
                    </div>
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center rounded-full bg-amber-200 px-2.5 py-0.5 text-amber-800">
                      <p className="whitespace-nowrap text-xs font-medium">
                        {item.role}
                      </p>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="text-right px-6 pl-0 whitespace-nowrap">
                    <Link
                      to=""
                      className="py-1 leading-none px-4 mr-10 font-medium hover:bg-gray-800 text-gray-800 text-xs border border-gray-800 hover:text-white duration-150  rounded-lg"
                    >
                      Edit
                    </Link>
                    <button
                      href="javascript:void()"
                      className="py-2 leading-none px-3 mr-10 font-medium bg-red-600 text-white text-xs hover:border border-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
