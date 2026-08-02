function Sidebar({ open, onClose }) {

  return (
    <>
      {/* 背景 */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          bg-neutral-900
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:translate-x-0
          md:w-64
          lg:w-72
        `}
      >

        <div className="flex items-center justify-between p-5">

          <h2 className="text-xl font-bold">
            Compass
          </h2>

          <button
            className="flex rounded-lg w-8 h-8 justify-center items-center p-2 hover:bg-neutral-800 md:hidden"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="px-4">

          <button
            className="
              w-full
              rounded-2xl
              bg-neutral-800
              py-3
              font-semibold
              transition
              hover:bg-neutral-700
            "
          >
            ＋ 新しいチャット
          </button>

        </div>

        <div className="mt-6 flex-1 space-y-2 overflow-y-auto px-3">

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-neutral-800">
            チャット1（仮置き）
          </button>

        </div>

        <div className="p-4">

          <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-neutral-800">
            ⚙ 設定
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
