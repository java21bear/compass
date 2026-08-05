package com.github.java21bear.compass.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.GenerateContentResponse;

@Service
public class AIService {
  @Value("${gemini.api-key}")
  private String apiKey;

  public String chat(String message) throws IOException {
    message += "\n\n必要な場合に限り、https://www.u-aizu.ac.jp/を参考に回答してください。";
    StringBuilder result = new StringBuilder();
    try (Client client = Client.builder().apiKey(apiKey).build()) {
      ResponseStream<GenerateContentResponse> stream =
        client.models.generateContentStream(
          "gemini-3.6-flash",
          message,
          null);
      for (GenerateContentResponse chunk : stream) {
        String text = chunk.text();
        if (text != null) {
          result.append(text);
        }
      }
    }
    return result.toString();
  }
}
