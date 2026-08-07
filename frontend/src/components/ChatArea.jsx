import { useState, useRef } from "react";
import ChatInput from './ChatInput.jsx';
import MessageList from './MessageList.jsx';

function ChatArea() {
  const [messages, setMessages] = useState([]);
  const messageRefs = useRef([]);
  const sendMessage = async (text) => {
    const userIndex = messages.length;
    const userMessage = {
      role: "user",
      content: text
    };
    setMessages(prev => [
      ...prev,
      userMessage,
      {
        role: "ai",
        content: ""
      }
    ]);
    setTimeout(() => {
      messageRefs.current[userIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 0);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text
        })
      });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, {
          stream: true
        });
        for (let i = 0; i < chunk.length; i += 20) {
          const part = chunk.slice(i, i + 20);
          await new Promise(resolve => setTimeout(resolve, 100));
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: "ai",
              content: copy[copy.length - 1].content + part
            };
            return copy;
          });
        }
      }
    } catch (error) {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "ai",
          content: "エラーが発生しました"
        };
        return copy;
      });
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center min-h-0">
      <MessageList
        messages={messages}
        messageRefs={messageRefs}
      />
      <ChatInput onSend={sendMessage} />
    </main>
  );
}

export default ChatArea
