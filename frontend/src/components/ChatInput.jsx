import { useState } from "react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="bg-neutral-800 p-2 md:p-4">
      <div className="flex w-full gap-3 rounded-full bg-neutral-700 p-2">
        <textarea
          rows={1}
          value={text}
          placeholder="メッセージを送信..."
          onChange={(e) => setText(e.target.value)}
          className="
            flex-1
            resize-none
            px-3
            py-2
            text-white
            outline-none
            placeholder:text-neutral-400
          "
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing || e.keyCode === 229) return;
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button
          onClick={submit}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-cyan-500
            transition
            hover:from-blue-400
            hover:to-cyan-400
          "
        >
          ↑
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
