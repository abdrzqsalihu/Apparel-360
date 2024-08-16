import { useState } from "react";
import GeneralSettings from "./components/GeneralSettings";
import SettingsMenu from "./components/SettingsMenu";
import SecuritySettings from "./components/SecuritySettings";

function Settings() {
  const [activeSection, setActiveSection] = useState("general");
  return (
    <div className="mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Settings
        </h1>
      </div>

      <div className="bg-white rounded-lg">
        <div className="flex">
          <div className="w-[18%] p-5">
            <SettingsMenu
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
          <div className="flex-1 py-2 border-l">
            {activeSection === "general" && <GeneralSettings />}
            {activeSection === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
