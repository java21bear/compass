package com.github.java21bear.compass.service;

import java.util.stream.Collectors;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.springframework.web.server.WebSession;

import com.github.java21bear.compass.model.ChatHistory;

import reactor.core.publisher.Flux;

@Service
public class ChatService {
  private final ChatClient chatClient;
  private final VectorStore vectorStore;

  public ChatService(ChatClient.Builder builder, VectorStore vectorStore) {
    this.chatClient = builder.build();
    this.vectorStore = vectorStore;
  }

  public Flux<String> stream(String message, WebSession session) {
    ChatHistory chatHistory = getChatHistory(session);
    chatHistory.add(new UserMessage(message));
    String context = vectorStore.similaritySearch(message)
      .stream()
      .map(Document::getText)
      .collect(Collectors.joining("\n"));
    StringBuilder response = new StringBuilder();
    return chatClient.prompt()
      .messages(chatHistory.getMessages())
      .system("""
        あなたは会津大学の履修計画支援チャットボットです。
        以下の情報を参考にして、質問に回答してください。
        
        %s
        """.formatted(context))
      .stream()
      .content()
      .doOnNext(response::append)
      .doOnComplete(() -> {
        chatHistory.add(new AssistantMessage(response.toString()));
      });
  }
  
  private ChatHistory getChatHistory(WebSession session) {
    return (ChatHistory) session.getAttributes().computeIfAbsent("chatHistory", key -> new ChatHistory());
  }
}
