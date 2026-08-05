import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { faBars, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-neutral-800 flex h-screen text-white">
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={sidebarOpen}
      />
      <div className="flex flex-1 flex-col">
        <header className="bg-neutral-900 flex gap-2 items-center md:hidden p-4">
          <button
            className="cursor-pointer flex h-8 hover:bg-neutral-800 items-center justify-center rounded-full transition-colors w-8"
            onClick={() => setSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="font-bold text-lg">
            Compass
          </h1>
        </header>
        <ChatArea />
      </div>
    </div>
  );
}

export default App;
