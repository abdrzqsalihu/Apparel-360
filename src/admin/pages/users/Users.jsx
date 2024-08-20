import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import UsersTable from "./components/UsersTable";

function Users() {
  return (
    <div>
      <div className="mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              User management
            </h1>
            <p className="text-gray-700 mt-2 text-sm">
              Manage users and account permissions
            </p>
          </div>
          <Link
            to="addusers"
            className="rounded-lg bg-gray-800 text-center py-2 px-4 text-sm text-gray-100 font-light transition hover:bg-gray-700 flex items-center gap-1"
          >
            <Plus size={17} /> Add User
          </Link>
        </div>

        {/* <Pagination /> */}
      </div>
      <UsersTable />
    </div>
  );
}

export default Users;
