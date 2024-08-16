import { Settings, ShieldCheck } from "lucide-react";

// eslint-disable-next-line react/prop-types
function SettingsMenu({ setActiveSection, activeSection }) {
  return (
    <div>
      <ul className="space-y-1 py-5">
        <li>
          <button
            onClick={() => setActiveSection("general")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 w-full ${
              activeSection === "general"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full"
            }`}
          >
            <Settings size={18} />

            <span className="text-sm font-medium"> General </span>
          </button>
        </li>

        <li>
          <button
            onClick={() => setActiveSection("security")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 w-full ${
              activeSection === "security"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full"
            }`}
          >
            <ShieldCheck size={18} />

            <span className="text-sm font-medium"> Security </span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SettingsMenu;
