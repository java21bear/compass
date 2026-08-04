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
      const response = await fetch(
        "http://localhost:8080/compass/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: text
          })
        }
      );
      if (!response.ok) {
        throw new Error("通信エラー");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        answer += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "ai",
            content: answer
          };
          return copy;
        });
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
    <main className="flex flex-1 flex-col min-h-0">
      <MessageList messages={messages} />
      <ChatInput onSend={sendMessage} />
    </main>
  );
}

export default ChatArea
