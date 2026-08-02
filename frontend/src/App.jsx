import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-800 text-white overflow-hidden">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">

        {/* スマホ用ヘッダー */}
        <header className="flex items-center gap-3 bg-neutral-900 p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex rounded-lg p-2 hover:bg-neutral-800 w-8 h-8 justify-center items-center"
          >
            ☰
          </button>

          <h1 className="text-lg font-semibold">
            Compass
          </h1>
        </header>

        <ChatArea />

      </div>

    </div>
  );
}

export default App;
