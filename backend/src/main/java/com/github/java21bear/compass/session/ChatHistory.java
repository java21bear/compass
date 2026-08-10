package com.github.java21bear.compass.session;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.chat.messages.Message;

public class ChatHistory {
  private final List<Message> messages = new ArrayList<>();

  public List<Message> getMessages() {
    return messages;
  }

  public void add(Message message) {
    messages.add(message);
  }
}
