import Pagination from "../../components/Pagination";
import MessagesTable from "./components/MessagesTable";

function Messages() {
  return (
    <div className="mx-auto px-5 md:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-800 mb-6">
        Feedback & Queries
      </h1>

      <MessagesTable />
      <Pagination />
    </div>
  );
}

export default Messages;
