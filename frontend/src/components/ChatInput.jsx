import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="max-w-200 p-4 w-full">
      <div className="bg-neutral-700 flex gap-2 items-center p-2 rounded-full">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="
            flex-1
            px-2
            resize-none
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
          placeholder="質問してみましょう"
          rows={1}
          value={text}
        />
        <button
          className="
            bg-gradient-to-r
            cursor-pointer
            flex
            from-blue-500
            h-8
            hover:from-blue-400
            hover:to-cyan-400
            items-center
            justify-center
            rounded-full
            to-cyan-500
            transition-colors
            w-8
          "
          onClick={submit}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
