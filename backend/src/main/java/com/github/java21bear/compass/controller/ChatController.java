package com.github.java21bear.compass.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.java21bear.compass.dto.ChatRequest;
import com.github.java21bear.compass.service.AIService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {
  private final AIService aiService;

  @PostMapping("/chat")
  public String chat(@RequestBody ChatRequest request) throws IOException {
    return aiService.chat(request.getMessage());
  }
}