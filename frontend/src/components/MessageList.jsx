import ReactMarkdown from "react-markdown";

function MessageList({ messages, messageRefs }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 w-full">
      <div className="flex flex-col gap-8 max-w-200 mx-auto">
        {messages.map((message, index) => (
          <div
            className={
              message.role === "ai"
                ? "flex"
                : "flex justify-end"
            }
            key={index}
            ref={el => messageRefs.current[index] = el}
          >
            <div
              className={
                message.role === "ai"
                  ? `
                  max-w-full
                  prose
                  prose-invert
                  `
                  : `
                  bg-neutral-700
                  max-w-[80%]
                  px-4
                  py-2
                  prose
                  prose-invert
                  rounded-2xl
                  `
              }
            >
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageList;
