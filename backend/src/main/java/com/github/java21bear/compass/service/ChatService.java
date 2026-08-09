package com.github.java21bear.compass.service;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

@Service
public class ChatService {
  private final ChatClient chatClient;
  private final VectorStore vectorStore;

  public ChatService(ChatClient.Builder builder, VectorStore vectorStore) {
    this.chatClient = builder.build();
    this.vectorStore = vectorStore;
  }

  public Flux<String> stream(String message) {
    List<Document> documents = vectorStore.similaritySearch(message);
    String context = documents.stream()
      .map(Document::getText)
      .reduce("", (a, b) -> a + "\n" + b);
    return chatClient.prompt()
      .system("""
        あなたは会津大学の履修計画支援チャットボットです。
        以下の情報を参考にして、質問に回答してください。
        
        【参考情報】
        %s
        """.formatted(context))
      .user(message)
      .stream()
      .content();
  }
}
