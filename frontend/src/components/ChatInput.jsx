import { useState } from "react";
import { faArrowUp, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChatInput({ disabled, onSend }) {
  const [text, setText] = useState("");
  const submit = () => {
    if (disabled) return;
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="absolute bottom-0 p-4 w-full">
      <div className="bg-neutral-700 flex gap-2 items-center max-w-200 mx-auto p-2 rounded-full">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="
            flex-1
            px-4
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
            bg-indigo-500
            cursor-pointer
            disabled:cursor-default
            disabled:opacity-50
            disabled:hover:bg-indigo-500
            flex
            h-8
            hover:bg-indigo-400
            items-center
            justify-center
            rounded-full
            transition-colors
            w-8
          "
          disabled={disabled}
          onClick={submit}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
