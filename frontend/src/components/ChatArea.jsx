import { useState } from "react";
import ChatInput from './ChatInput.jsx';
import MessageList from './MessageList.jsx';

function ChatArea() {
  const [messages, setMessages] = useState([]);
  const sendMessage = async (text) => {
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
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }
      const json = JSON.parse(result);
      const message = json.message;
      let answer = "";
      for (const char of message) {
        answer += char;
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "ai",
            content: answer
          };
          return copy;
        });
        await new Promise(resolve => setTimeout(resolve, 10));
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
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} />
    </main>
  );
}

export default ChatArea
