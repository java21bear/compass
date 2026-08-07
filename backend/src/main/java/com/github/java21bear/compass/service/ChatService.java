package com.github.java21bear.compass.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

@Service
public class ChatService {
  private final ChatClient chatClient;

  public ChatService(ChatClient.Builder builder) {
    this.chatClient = builder.build();
  }

  public Flux<String> stream(String message) {
    return chatClient.prompt().user(message).stream().content();
  }
}
