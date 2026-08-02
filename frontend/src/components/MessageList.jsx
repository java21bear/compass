import ReactMarkdown from "react-markdown";

function MessageList({ messages }) {

  return (
    <div className="flex-1 overflow-y-auto px-3 py-6 md:px-6 lg:px-10">

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">

        {messages.map((message, index) => (

          <div
            key={index}
            className={
              message.role === "ai"
                ? "flex justify-start"
                : "flex justify-end"
            }
          >

            <div
              className={
                message.role === "ai"
                  ? `
                  max-w-[95%]
                  md:max-w-[85%]
                  lg:max-w-[70%]
                  rounded-3xl
                  bg-neutral-700
                  px-5
                  py-4
                  shadow-lg
                  `
                  : `
                  max-w-[95%]
                  md:max-w-[85%]
                  lg:max-w-[70%]
                  rounded-3xl
                  bg-neutral-700
                  px-5
                  py-4
                  shadow-lg
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
