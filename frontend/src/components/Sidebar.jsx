import { faBars, faGear, faPaperPlane, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          bg-black/50
          fixed
          inset-0
          md:hidden
          transition-opacity
          z-40
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />
      <aside
        className={`
          bg-neutral-900
          duration-500
          ease-out
          fixed
          flex
          flex-col
          h-screen
          left-0
          md:static
          md:translate-x-0
          top-0
          transition-transform
          w-64
          z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex gap-2 h-16 items-center justify-between p-4">
          <div className="font-bold text-lg">
            Compass
          </div>
          <button
            className="
              cursor-pointer
              flex
              h-8
              hover:bg-neutral-800
              items-center
              justify-center
              md:hidden
              rounded-full
              transition-colors
              w-8
            "
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="p-4">
          <button
            className="
              bg-linear-to-r
              cursor-pointer
              from-indigo-500
              hover:from-indigo-400
              hover:to-violet-400
              hover:via-indigo-500
              py-2
              rounded-xl
              to-violet-500
              transition-colors
              via-indigo-600
              w-full
            "
          >
            <FontAwesomeIcon icon={faPlus} /> 新しいチャット（未実装）
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            チャット履歴（未実装）
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            *
          </button>
        </div>
        <div className="p-4">
          <button className="cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-xl text-left transition-colors w-full">
            <FontAwesomeIcon icon={faGear} /> 設定（未実装）
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
