import { CheckCircle2, Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

function OrderTable() {
  const tableItems = [
    {
      name: "Liam James",
      email: "liamjames@example.com",
      phone: "08083373629",
    },
    {
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      phone: "08083373629",
    },
    {
      name: "William Benjamin",
      email: "william.benjamin@example.com",
      phone: "08083373629",
    },
    {
      name: "Henry Theodore",
      email: "henrytheodore@example.com",
      phone: "08083373629",
    },
    {
      name: "Amelia Elijah",
      email: "amelia.elijah@example.com",
      phone: "08083373629",
    },
  ];

  return (
    <div className="mx-auto bg-white rounded-md mt-4">
      <div className="shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-800 text-gray-200 font-medium border-b">
            <tr className="divide-x divide-gray-600">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6 whitespace-nowrap">Date placed</th>

              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100 divide-x">
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-07-13</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                    <CheckCircle2 size={10} className="mr-1" />

                    <span className="whitespace-nowrap text-xs">Confirmed</span>
                  </span> */}

                  <span className="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700">
                    <Loader2Icon size={10} className="mr-1" />

                    <span className="whitespace-nowrap text-xs">Pending</span>
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <Link
                    to={`orderdetails`}
                    className="inline-block rounded border border-gray-900 px-3 py-2 text-xs font-medium text-gray-800 hover:text-white hover:bg-gray-800"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
