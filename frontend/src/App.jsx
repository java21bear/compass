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
        <header className="bg-neutral-900 flex gap-2 h-16 items-center md:hidden p-4">
          <button
            className="cursor-pointer flex h-10 hover:bg-neutral-800 items-center justify-center rounded-full transition-colors w-10"
            onClick={() => setSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </header>
        <ChatArea />
      </div>
    </div>
  );
}

export default App;
