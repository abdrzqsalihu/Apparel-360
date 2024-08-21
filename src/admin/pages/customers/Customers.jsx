// import Pagination from "../../components/Pagination";
import CustomersTable from "./component/CustomersTable";

function Customers() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-800 mb-6">
        Customers
      </h1>

      <CustomersTable />
      {/* <Pagination /> */}
    </div>
  );
}

export default Customers;
