package com.github.java21bear.compass.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.java21bear.compass.dto.ChatRequest;
import com.github.java21bear.compass.service.ChatService;

import reactor.core.publisher.Flux;

@RestController
public class ChatController {
  private final ChatService chatService;

  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  @PostMapping(value = "/chat", produces = MediaType.TEXT_PLAIN_VALUE)
  public Flux<String> chat(@RequestBody ChatRequest request) {
    return chatService.stream(request.message());
  }
}
