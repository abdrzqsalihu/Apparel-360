import OrderTable from "./components/OrderTable";
// import Pagination from "../../components/Pagination";

function Orders() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-800 mb-6">
        Orders
      </h1>

      <OrderTable />
      {/* <Pagination /> */}
    </div>
  );
}

export default Orders;
