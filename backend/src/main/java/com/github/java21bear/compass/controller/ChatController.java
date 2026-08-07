package com.github.java21bear.compass.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.java21bear.compass.dto.ChatRequest;
import com.github.java21bear.compass.dto.ChatResponse;
import com.github.java21bear.compass.service.ChatService;

@RestController
public class ChatController {
  private final ChatService chatService;

  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  @PostMapping("/chat")
  public ChatResponse chat(@RequestBody ChatRequest chatRequest) {
    return chatService.call(chatRequest);
  }
}
