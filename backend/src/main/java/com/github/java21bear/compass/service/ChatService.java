package com.github.java21bear.compass.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.ChatClient.CallResponseSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.java21bear.compass.dto.ChatRequest;
import com.github.java21bear.compass.dto.ChatResponse;

@Service
public class ChatService {
  @Autowired
  private ChatClient.Builder chatClientBuilder;

  public ChatResponse call(ChatRequest chatRequest) {
    ChatClient chatClient = chatClientBuilder.build();
    CallResponseSpec response = chatClient.prompt().user(chatRequest.message()).call();
    return new ChatResponse(response.content());
  }
}
