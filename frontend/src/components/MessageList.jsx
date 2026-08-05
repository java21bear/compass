import ReactMarkdown from "react-markdown";

function MessageList({ messages }) {
  return (
    <div className="flex-1 max-w-200 overflow-y-auto p-4 w-full">
      <div className="flex flex-col gap-8">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "ai"
                ? "flex"
                : "flex justify-end"
            }
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
